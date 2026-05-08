def calculate_score(complexity, execution_time, plagiarism):

    score = 100

    # COMPLEXITY SCORE

    if complexity == "O(1)":
        score = 100

    elif complexity == "O(log n)":
        score = 95

    elif complexity == "O(n)":
        score = 90

    elif complexity == "O(n log n)":
        score = 80

    elif complexity == "O(n^2)":
        score = 60

    elif complexity == "O(n^3)":
        score = 40

    # EXECUTION TIME PENALTY

    try:
        time_value = float(execution_time.replace(" sec", ""))

        if time_value > 2:
            score -= 10

    except:
        pass

    # PLAGIARISM PENALTY

    try:
        plagiarism_value = int(plagiarism.replace("%", ""))

        if plagiarism_value > 80:
            score -= 40

        elif plagiarism_value > 60:
            score -= 25

    except:
        pass

    # STATUS

    if score > 85:
        status = "Efficient"

    elif score > 70:
        status = "Good"

    else:
        status = "Needs Improvement"

    return score, status