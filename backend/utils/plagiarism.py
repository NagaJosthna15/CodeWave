from difflib import SequenceMatcher


def check_plagiarism(code1, code2):

    similarity = SequenceMatcher(
        None,
        code1,
        code2
    ).ratio()

    percentage = round(similarity * 100, 2)

    plagiarism_detected = False

    if percentage >= 80:
        plagiarism_detected = True

    return {
        "similarity": f"{percentage}%",
        "plagiarism_detected": plagiarism_detected
    }