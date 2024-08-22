import pandas as pd
import joblib  # For loading the model

# Load the saved model
model = joblib.load('placement_model.sav')  # Replace with the saved model filename


# Function to predict placement likelihood for a new user
def predict_placement_likelihood(model, user_data):
  df = pd.DataFrame(user_data)
  print(df)
#   print(user_X)
  likelihood = model.predict(df)
  return likelihood[0]


data_dict = {
    'CGPA': [6.733618039413735], 'Internship Experience': [1], 'Projects Undertaken': [2], 'Soft Skills': [6], 
    'C#': [0], 'C++': [1], 'Go': [1], 'Java': [1], 'JavaScript': [0], 'Kotlin': [0], 'PHP': [1], 'Python': [0], 'Ruby': [0], 'Rust': [0],
    'Swift': [0], 'TypeScript': [0], 'Array': [1], 'Backtracking': [0], 'Bit Manipulation': [1], 'Divide and Conquer': [0],
    'Dynamic Programming': [1], 'Graph Algorithms': [1], 'Greedy Algorithms': [1], 'Hashing': [1], 'Linked List': [0],
    'Recursion': [1], 'Searching Algorithms': [0], 'Sorting Algorithms': [1], 'Stacks and Queues': [0], 'String Algorithms': [1],
    'Tree Algorithms': [0], 'Algorithms': [1], 'Calculus': [0], 'Complexity Analysis': [1], 'Data Structures': [1],
    'Differential Equations': [0], 'Discrete Mathematics': [1], 'Graph Theory': [0], 'Linear Algebra': [1], 'Logic': [1],
    'Mathematics': [1], 'Number Theory': [0], 'Numerical Analysis': [1], 'Probability': [1], 'Set Theory': [1],
    'Statistics': [1]
}



# placement_likelihood = predict_placement_likelihood(model, data_dict)
# print(f"\nPredicted Placement Likelihood: {placement_likelihood:.2f}%")



# Option to check for a new user
while True:
  print("\nEnter details of the new user:")
  cgpa = float(input("CGPA (6-10): "))
  dsa_topics = input("DSA Topics Covered (comma-separated): ")
  fundamental_topics = input("Fundamental Topics Covered (comma-separated): ")
  languages = input("Languages Known (comma-separated): ").split(', ')
  internship_exp = int(input("Internship Experience (0 or 1): "))
  projects = int(input("Projects Undertaken (0-5): "))
  soft_skills = int(input("Soft Skills (0-10): "))

  # Prepare user data
  

  print(user_data)

  # Predict placement likelihood
  placement_likelihood = predict_placement_likelihood(model, user_data)
  print(f"\nPredicted Placement Likelihood: {placement_likelihood:.2f}%")

  # Option to check for another user
  choice = input("\nDo you want to check for another user? (yes/no): ")
  if choice.lower() != 'yes':
      break
