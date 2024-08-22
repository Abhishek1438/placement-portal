import pandas as pd
import joblib  # For loading the model

# Load the saved model
model = joblib.load('placement_model.sav')  # Replace with the saved model filename

# Function to predict placement likelihood for a new user
def predict_placement_likelihood(model, user_data):
    df = pd.DataFrame(user_data)
    print(df)
    likelihood = model.predict(df)
    return likelihood[0]

# Option to check for a new user
while True:
    print("\nEnter details of the new user:")
    cgpa = float(input("CGPA (6-10): "))
    dsa_topics = input("DSA Topics Covered (comma-separated): ").split(',')
    fundamental_topics = input("Fundamental Topics Covered (comma-separated): ").split(',')
    languages = input("Languages Known (comma-separated): ").split(',')
    internship_exp = int(input("Internship Experience (0 or 1): "))
    projects = int(input("Projects Undertaken (0-5): "))
    soft_skills = int(input("Soft Skills (0-10): "))

    # Prepare user data
    data_dict = {
        'CGPA': [cgpa], 'Internship Experience': [internship_exp], 'Projects Undertaken': [projects], 'Soft Skills': [soft_skills], 
        'C#': [0], 'C++': [0], 'Go': [0], 'Java': [0], 'JavaScript': [0], 'Kotlin': [0], 'PHP': [0], 'Python': [0], 'Ruby': [0], 'Rust': [0],
        'Swift': [0], 'TypeScript': [0], 'Array': [0], 'Backtracking': [0], 'Bit Manipulation': [0], 'Divide and Conquer': [0],
        'Dynamic Programming': [0], 'Graph Algorithms': [0], 'Greedy Algorithms': [0], 'Hashing': [0], 'Linked List': [0],
        'Recursion': [0], 'Searching Algorithms': [0], 'Sorting Algorithms': [0], 'Stacks and Queues': [0], 'String Algorithms': [0],
        'Tree Algorithms': [0], 'Algorithms': [0], 'Calculus': [0], 'Complexity Analysis': [0], 'Data Structures': [0],
        'Differential Equations': [0], 'Discrete Mathematics': [0], 'Graph Theory': [0], 'Linear Algebra': [0], 'Logic': [0],
        'Mathematics': [0], 'Number Theory': [0], 'Numerical Analysis': [0], 'Probability': [0], 'Set Theory': [0],
        'Statistics': [0]
    }

    # Update data_dict with user provided DSA topics
    for topic in dsa_topics:
        topic = topic.strip()  # Remove leading and trailing spaces
        data_dict[topic] = [1]

    # Update data_dict with user provided Fundamental topics
    for topic in fundamental_topics:
        topic = topic.strip()  # Remove leading and trailing spaces
        data_dict[topic] = [1]

    # Update data_dict with user provided languages
    for lang in languages:
        lang = lang.strip()
        data_dict[lang] = [1]

    # Predict placement likelihood
    placement_likelihood = predict_placement_likelihood(model, data_dict)
    print(f"\nPredicted Placement Likelihood: {placement_likelihood:.2f}%")

    # Option to check for another user
    choice = input("\nDo you want to check for another user? (yes/no): ")
    if choice.lower() != 'yes':
        break
