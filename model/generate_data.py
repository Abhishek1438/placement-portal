import pandas as pd
import numpy as np

# List of possible DSA topics, fundamental topics, and languages
dsa_topics = ['Array', 'Sorting Algorithms', 'Graph Algorithms', 'Dynamic Programming', 'Tree Algorithms',
              'Hashing', 'String Algorithms', 'Greedy Algorithms', 'Searching Algorithms', 'Backtracking',
              'Linked List', 'Bit Manipulation', 'Stacks and Queues', 'Recursion', 'Divide and Conquer']

fundamental_topics = ['Data Structures', 'Algorithms', 'Mathematics', 'Complexity Analysis', 'Number Theory',
                      'Discrete Mathematics', 'Graph Theory', 'Logic', 'Set Theory', 'Probability',
                      'Statistics', 'Linear Algebra', 'Calculus', 'Differential Equations', 'Numerical Analysis']

languages = ['Python', 'Java', 'C++', 'JavaScript', 'Ruby', 'C#', 'Go', 'Swift', 'Kotlin', 'Rust', 'PHP', 'TypeScript']

# Create dummy data
np.random.seed(42)

# Generate dummy data for 1000 students
data = {
    'Name': [f'Student{i}' for i in range(1, 1001)],
    'Roll No': [f'Roll{i}' for i in range(1, 1001)],
    'CGPA': np.random.uniform(6, 10, 1000),
    'DSA Topics Covered': [', '.join(np.random.choice(dsa_topics, size=np.random.randint(1, 16), replace=False)) for _ in range(1000)],
    'Fundamental Topics Covered': [', '.join(np.random.choice(fundamental_topics, size=np.random.randint(1, 16), replace=False)) for _ in range(1000)],
    'Languages': [', '.join(np.random.choice(languages, size=np.random.randint(1, 6), replace=False)) for _ in range(1000)],
    'Internship Experience': np.random.randint(0, 2, 1000),
    'Projects Undertaken': np.random.randint(0, 5, 1000),
    'Soft Skills': np.random.randint(0, 10, 1000),
    'Placement Likelihood': np.random.randint(0, 101, 1000)  # Likelihood of placement (0-100)
}

# Increase placement likelihood based on DSA topics covered, fundamental topics covered, and CGPA
for i in range(1000):
    if 'Sorting Algorithms' in data['DSA Topics Covered'][i] or 'Graph Algorithms' in data['DSA Topics Covered'][i]:
        data['Placement Likelihood'][i] += 20
    if 'Data Structures' in data['Fundamental Topics Covered'][i] or 'Algorithms' in data['Fundamental Topics Covered'][i]:
        data['Placement Likelihood'][i] += 20
    if data['CGPA'][i] >= 9:
        data['Placement Likelihood'][i] += 20

    # Ensure placement likelihood is within 0-100 range
    data['Placement Likelihood'][i] = min(100, max(0, data['Placement Likelihood'][i]))

# Create DataFrame
df = pd.DataFrame(data)

# Save DataFrame to CSV file
df.to_csv('student_data.csv', index=False)

print("Data saved to student_data.csv")
