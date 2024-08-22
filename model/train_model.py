import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error
import joblib

# Load data from CSV file
df = pd.read_csv('student_data.csv')
# List of possible DSA topics, fundamental topics, and languages
dsa_topics = ['Array', 'Sorting Algorithms', 'Graph Algorithms', 'Dynamic Programming',
              'Tree Algorithms', 'Hashing', 'String Algorithms', 'Greedy Algorithms',
              'Searching Algorithms', 'Backtracking', 'Linked List', 'Bit Manipulation',
              'Stacks and Queues', 'Recursion', 'Divide and Conquer']

fundamental_topics = ['Data Structures', 'Algorithms', 'Mathematics', 'Complexity Analysis',
                       'Number Theory', 'Discrete Mathematics', 'Graph Theory', 'Logic',
                       'Set Theory', 'Probability', 'Statistics', 'Linear Algebra', 'Calculus',
                       'Differential Equations', 'Numerical Analysis']

languages = ['Python', 'Java', 'C++', 'JavaScript', 'Ruby', 'C#', 'Go', 'Swift', 'Kotlin',
             'Rust', 'PHP', 'TypeScript']


# Function to preprocess data and create features and target
def preprocess_data(df):
    # Convert list of languages into separate binary columns using one-hot encoding
    lang_encoded = df['Languages'].str.get_dummies(sep=', ')

    # Convert DSA Topics Covered and Fundamental Topics Covered into binary columns using one-hot encoding
    dsa_topics_encoded = df['DSA Topics Covered'].str.get_dummies(sep=', ')
    fundamental_topics_encoded = df['Fundamental Topics Covered'].str.get_dummies(sep=', ')
    df = pd.concat([df,lang_encoded, dsa_topics_encoded, fundamental_topics_encoded], axis=1).drop(
        ['Languages', 'DSA Topics Covered', 'Fundamental Topics Covered'], axis=1)

    # Drop columns if they exist
    columns_to_drop = ['Name', 'Roll No']
    df = df.drop(columns_to_drop, axis=1, errors='ignore')

    df.to_csv('test.csv', index=False)
    print(df)

    # Split data into features and target
    X = df.drop('Placement Likelihood', axis=1)
    y = df['Placement Likelihood']

    return X, y


# Preprocess data
X, y = preprocess_data(df)

# Create and train Random Forest Regressor model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X, y)


# Function to evaluate model using cross-validation
def evaluate_model(model, X, y):
    scores = cross_val_score(model, X, y, cv=5, scoring='neg_mean_squared_error')
    rmse = np.sqrt(-scores.mean())
    std_dev = scores.std()
    return rmse, std_dev


# Evaluate model using cross-validation
cv_rmse, cv_std_dev = evaluate_model(model, X, y)
print("Cross-validated RMSE:", cv_rmse)
print("Standard Deviation:", cv_std_dev)

# Save the model for future use
joblib.dump(model, 'placement_model.sav')  # Replace with your desired filename

print("Model saved successfully!")
