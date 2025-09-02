from typing import Dict


def improve_resume(content: str) -> Dict[str, str]:
    return {
        'original_content': content,
        'improved_content': content + '\n [Improved]'
    }
