import ast

def get_complexity(code):
    tree = ast.parse(code)
    loops = 0

    for node in ast.walk(tree):
        if isinstance(node, (ast.For, ast.While)):
            loops += 1

    if loops == 0:
        return "O(1)"
    elif loops == 1:
        return "O(n)"
    else:
        return "O(n^2)"