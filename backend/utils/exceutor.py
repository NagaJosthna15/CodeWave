import subprocess
import os
import time
import psutil


TEMP_DIR = os.path.abspath("temp")

os.makedirs(TEMP_DIR, exist_ok=True)


def run_code(language, code):

    try:

        # PYTHON
        if language == "python":

            py_file = os.path.join(TEMP_DIR, "temp.py")

            with open(py_file, "w") as f:
                f.write(code)

            start_time = time.time()

            process = subprocess.run(
                ["python", py_file],
                capture_output=True,
                text=True,
                timeout=5
            )

            end_time = time.time()

            execution_time = round(end_time - start_time, 4)

            memory_usage = round(
                psutil.Process().memory_info().rss / 1024 / 1024,
                2
            )

            return {
                "output": process.stdout or process.stderr,
                "execution_time": f"{execution_time} sec",
                "memory_usage": f"{memory_usage} MB"
            }

        # JAVA
        elif language == "java":

            java_file = os.path.join(TEMP_DIR, "Main.java")

            with open(java_file, "w") as f:
                f.write(code)

            start_time = time.time()

            compile_result = subprocess.run(
                ["javac", java_file],
                capture_output=True,
                text=True
            )

            if compile_result.stderr:
                return {
                    "output": compile_result.stderr
                }

            run_result = subprocess.run(
                ["java", "-cp", TEMP_DIR, "Main"],
                capture_output=True,
                text=True,
                timeout=5
            )

            end_time = time.time()

            execution_time = round(end_time - start_time, 4)

            memory_usage = round(
                psutil.Process().memory_info().rss / 1024 / 1024,
                2
            )

            return {
                "output": run_result.stdout or run_result.stderr,
                "execution_time": f"{execution_time} sec",
                "memory_usage": f"{memory_usage} MB"
            }

        # C
        elif language == "c":

            c_file = os.path.join(TEMP_DIR, "temp.c")
            exe_file = os.path.join(TEMP_DIR, "temp.exe")

            with open(c_file, "w") as f:
                f.write(code)

            start_time = time.time()

            compile_result = subprocess.run(
                [
                    "gcc",
                    c_file,
                    "-o",
                    exe_file
                ],
                capture_output=True,
                text=True
            )

            if compile_result.stderr:
                return {
                    "output": compile_result.stderr
                }

            if not os.path.exists(exe_file):
                return {
                    "output": "C exe not created"
                }

            run_result = subprocess.run(
                exe_file,
                capture_output=True,
                text=True,
                timeout=5,
                shell=True
            )

            end_time = time.time()

            execution_time = round(end_time - start_time, 4)

            memory_usage = round(
                psutil.Process().memory_info().rss / 1024 / 1024,
                2
            )

            return {
                "output": run_result.stdout or run_result.stderr,
                "execution_time": f"{execution_time} sec",
                "memory_usage": f"{memory_usage} MB"
            }

        # C++
        elif language == "cpp":

            cpp_file = os.path.join(TEMP_DIR, "temp.cpp")
            exe_file = os.path.join(TEMP_DIR, "temp.exe")

            with open(cpp_file, "w") as f:
                f.write(code)

            start_time = time.time()

            compile_result = subprocess.run(
                [
                    "g++",
                    cpp_file,
                    "-o",
                    exe_file
                ],
                capture_output=True,
                text=True
            )

            if compile_result.stderr:
                return {
                    "output": compile_result.stderr
                }

            if not os.path.exists(exe_file):
                return {
                    "output": "CPP exe not created"
                }

            run_result = subprocess.run(
                exe_file,
                capture_output=True,
                text=True,
                timeout=5,
                shell=True
            )

            end_time = time.time()

            execution_time = round(end_time - start_time, 4)

            memory_usage = round(
                psutil.Process().memory_info().rss / 1024 / 1024,
                2
            )

            return {
                "output": run_result.stdout or run_result.stderr,
                "execution_time": f"{execution_time} sec",
                "memory_usage": f"{memory_usage} MB"
            }

        # JAVASCRIPT
        elif language == "javascript":

            js_file = os.path.join(TEMP_DIR, "temp.js")

            with open(js_file, "w") as f:
                f.write(code)

            start_time = time.time()

            result = subprocess.run(
                ["node", js_file],
                capture_output=True,
                text=True,
                timeout=5
            )

            end_time = time.time()

            execution_time = round(end_time - start_time, 4)

            memory_usage = round(
                psutil.Process().memory_info().rss / 1024 / 1024,
                2
            )

            return {
                "output": result.stdout or result.stderr,
                "execution_time": f"{execution_time} sec",
                "memory_usage": f"{memory_usage} MB"
            }

        else:

            return {
                "output": "Unsupported language"
            }

    except Exception as e:

        return {
            "output": str(e)
        }