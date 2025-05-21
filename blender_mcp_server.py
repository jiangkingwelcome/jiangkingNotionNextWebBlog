#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Blender MCP服务器
此脚本在Blender中运行，提供MCP（Model Context Protocol）服务
"""

import bpy
import socket
import threading
import json
import traceback
import os
import sys
from datetime import datetime

# MCP服务器配置
HOST = 'localhost'  # 服务器主机名
PORT = 9876         # 服务器端口
LOG_FILE = os.path.join(os.path.expanduser("~"), "blender_mcp_server.log")  # 日志文件路径

# 初始化日志
def log(message, level="INFO"):
    """记录日志信息"""
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    log_message = f"[{timestamp}] [{level}] {message}"
    print(log_message)
    try:
        with open(LOG_FILE, "a", encoding="utf-8") as f:
            f.write(log_message + "\n")
    except Exception as e:
        print(f"写入日志失败: {str(e)}")

# 初始化日志文件
def init_log():
    """初始化日志文件"""
    try:
        log_dir = os.path.dirname(LOG_FILE)
        if not os.path.exists(log_dir):
            os.makedirs(log_dir)
        with open(LOG_FILE, "w", encoding="utf-8") as f:
            f.write(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] [INFO] Blender MCP服务器日志启动\n")
        log(f"日志文件已初始化: {LOG_FILE}")
    except Exception as e:
        print(f"初始化日志失败: {str(e)}")

# MCP命令处理函数
def handle_mcp_command(command_str):
    """处理MCP命令并返回响应"""
    try:
        # 尝试解析JSON格式的命令
        command = json.loads(command_str)
        cmd_type = command.get("type", "").upper()
        params = command.get("params", {})
        
        log(f"收到命令: {cmd_type} 参数: {params}")
        
        # 根据命令类型执行相应操作
        if cmd_type == "CREATE_MESH":
            mesh_type = params.get("mesh_type", "cube").lower()
            size = float(params.get("size", 2.0))
            location = params.get("location", [0, 0, 0])
            
            if mesh_type == "cube":
                bpy.ops.mesh.primitive_cube_add(size=size, location=location)
                return json.dumps({"status": "success", "message": "成功创建立方体"})
            elif mesh_type == "sphere":
                bpy.ops.mesh.primitive_uv_sphere_add(radius=size/2, location=location)
                return json.dumps({"status": "success", "message": "成功创建球体"})
            elif mesh_type == "cylinder":
                bpy.ops.mesh.primitive_cylinder_add(radius=size/2, depth=size, location=location)
                return json.dumps({"status": "success", "message": "成功创建圆柱体"})
            else:
                return json.dumps({"status": "error", "message": f"未知的网格类型: {mesh_type}"})
        
        elif cmd_type == "EXPORT":
            file_format = params.get("format", "fbx").lower()
            file_path = params.get("path", f"blender_export.{file_format}")
            
            if file_format == "fbx":
                bpy.ops.export_scene.fbx(filepath=file_path)
                return json.dumps({"status": "success", "message": f"场景已导出为FBX: {file_path}"})
            elif file_format == "obj":
                bpy.ops.export_scene.obj(filepath=file_path)
                return json.dumps({"status": "success", "message": f"场景已导出为OBJ: {file_path}"})
            elif file_format == "gltf":
                bpy.ops.export_scene.gltf(filepath=file_path)
                return json.dumps({"status": "success", "message": f"场景已导出为GLTF: {file_path}"})
            else:
                return json.dumps({"status": "error", "message": f"不支持的导出格式: {file_format}"})
        
        elif cmd_type == "RENDER":
            output_path = params.get("path", "render.png")
            resolution_x = int(params.get("resolution_x", 1920))
            resolution_y = int(params.get("resolution_y", 1080))
            
            # 设置渲染参数
            bpy.context.scene.render.resolution_x = resolution_x
            bpy.context.scene.render.resolution_y = resolution_y
            bpy.context.scene.render.filepath = output_path
            
            # 执行渲染
            bpy.ops.render.render(write_still=True)
            return json.dumps({"status": "success", "message": f"渲染完成，已保存至: {output_path}"})
        
        elif cmd_type == "STATUS":
            # 返回Blender当前状态信息
            status = {
                "blender_version": bpy.app.version_string,
                "active_object": bpy.context.active_object.name if bpy.context.active_object else None,
                "object_count": len(bpy.data.objects),
                "scene_name": bpy.context.scene.name
            }
            return json.dumps({"status": "success", "data": status})
        
        else:
            return json.dumps({"status": "error", "message": f"未知命令: {cmd_type}"})
            
    except json.JSONDecodeError:
        log(f"JSON解析失败: {command_str}", "ERROR")
        return json.dumps({"status": "error", "message": "无效的JSON格式"})
    except Exception as e:
        error_msg = str(e)
        traceback_str = traceback.format_exc()
        log(f"处理命令时出错: {error_msg}\n{traceback_str}", "ERROR")
        return json.dumps({"status": "error", "message": f"命令执行出错: {error_msg}"})

# MCP服务器实现
def start_mcp_server():
    """启动MCP服务器"""
    log(f"启动MCP服务器 {HOST}:{PORT}")
    
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
            s.bind((HOST, PORT))
            s.listen(5)
            log(f"MCP服务器已启动，监听 {HOST}:{PORT}")
            
            while True:
                try:
                    conn, addr = s.accept()
                    log(f"客户端连接: {addr}")
                    
                    # 为每个客户端创建一个新线程
                    client_thread = threading.Thread(
                        target=handle_client,
                        args=(conn, addr)
                    )
                    client_thread.daemon = True
                    client_thread.start()
                except Exception as e:
                    log(f"接受连接时出错: {str(e)}", "ERROR")
    except Exception as e:
        log(f"启动服务器时出错: {str(e)}", "ERROR")
        log(traceback.format_exc(), "ERROR")

# 客户端处理函数
def handle_client(conn, addr):
    """处理客户端连接"""
    try:
        with conn:
            buffer = b""
            while True:
                chunk = conn.recv(4096)
                if not chunk:
                    break
                
                buffer += chunk
                
                # 检查是否有完整的命令（以换行符结束）
                if b'\n' in buffer:
                    commands = buffer.split(b'\n')
                    buffer = commands.pop()  # 保留最后一个不完整的命令
                    
                    for cmd in commands:
                        if cmd:  # 忽略空命令
                            cmd_str = cmd.decode('utf-8').strip()
                            log(f"处理命令: {cmd_str[:100]}...")
                            response = handle_mcp_command(cmd_str)
                            conn.sendall(response.encode('utf-8') + b'\n')
    except ConnectionResetError:
        log(f"客户端 {addr} 断开连接")
    except Exception as e:
        log(f"处理客户端 {addr} 时出错: {str(e)}", "ERROR")
        log(traceback.format_exc(), "ERROR")
    finally:
        log(f"客户端 {addr} 连接已关闭")

# 创建SSE服务器（用于Cursor连接）
def start_sse_server():
    """启动SSE服务器，用于Cursor连接"""
    from http.server import HTTPServer, BaseHTTPRequestHandler
    import time
    
    class SSEHandler(BaseHTTPRequestHandler):
        def do_GET(self):
            if self.path == '/stream':
                self.send_response(200)
                self.send_header('Content-Type', 'text/event-stream')
                self.send_header('Cache-Control', 'no-cache')
                self.send_header('Connection', 'keep-alive')
                self.end_headers()
                
                try:
                    while True:
                        # 发送保持连接的消息
                        self.wfile.write(b"data: {\"ping\": true}\n\n")
                        self.wfile.flush()
                        time.sleep(30)  # 每30秒发送一次保持连接的消息
                except Exception as e:
                    log(f"SSE连接中断: {str(e)}")
            else:
                self.send_response(404)
                self.end_headers()
                self.wfile.write(b'Not Found')
    
    try:
        sse_port = PORT + 1  # SSE服务器使用下一个端口
        server = HTTPServer((HOST, sse_port), SSEHandler)
        log(f"SSE服务器已启动，监听 {HOST}:{sse_port}")
        server.serve_forever()
    except Exception as e:
        log(f"启动SSE服务器出错: {str(e)}", "ERROR")

# 主函数
def main():
    """主函数"""
    init_log()
    log("Blender MCP服务器启动中...")
    
    # 启动MCP服务器线程
    mcp_thread = threading.Thread(target=start_mcp_server)
    mcp_thread.daemon = True
    mcp_thread.start()
    
    # 启动SSE服务器线程
    sse_thread = threading.Thread(target=start_sse_server)
    sse_thread.daemon = True
    sse_thread.start()
    
    log("服务器线程已启动，Blender可以继续正常使用")
    
    # 在Blender的信息面板显示状态信息
    def draw_server_status(self, context):
        layout = self.layout
        layout.label(text=f"MCP服务器正在运行: {HOST}:{PORT}")
        layout.label(text=f"SSE服务器正在运行: {HOST}:{PORT+1}")
    
    bpy.types.TOPBAR_MT_editor_menus.append(draw_server_status)

# 从Blender文本编辑器运行此脚本
if __name__ == "__main__":
    main() 