from flask import Flask, request, jsonify
import pickle
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import tensorflow as tf
from gensim.models import Word2Vec

app = Flask(__name__)

# Load models and dataframe
word2vec_model = pickle.load(open('models/word2vec_model.pkl', 'rb'))
similarity_model = tf.keras.models.load_model('models/similarity_model.h5')
df = pickle.load(open('models/data_frame.pkl', 'rb'))

def get_recipe_vector(ingredients):
    vector = np.zeros(word2vec_model.vector_size)
    count = 0
    for ingredient in ingredients:
        if ingredient in word2vec_model.wv:
            vector += word2vec_model.wv[ingredient]
            count += 1
    if count > 0:
        vector /= count
    return vector

def recommend_recipes(user_allergy_ingredients, user_preference_ingredients):
    user_preference_vector = get_recipe_vector(user_preference_ingredients)
    user_preference_vector = similarity_model.predict(np.array([user_preference_vector]))[0]

    def contains_allergens(ingredients, allergens):
        return any(allergen in ingredients for allergen in allergens)

    # Filter out recipes that contain any of the allergy ingredients
    filtered_df = df[~df['tokenized_ingredients'].apply(lambda x: contains_allergens(x, user_allergy_ingredients))]

    # If no recipes are available after filtering, return an empty list
    if filtered_df.empty:
        return []

    similarities = cosine_similarity([user_preference_vector], filtered_df['recipe_vector'].tolist())[0]
    sorted_indices = np.argsort(similarities)[::-1]
    top_indices = sorted_indices[:30]

    recommendations = filtered_df.iloc[top_indices]
    result = recommendations.index.tolist()
    result = [int(i) for i in result]

    return result

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.json
    user_allergy_ingredients = data['allergy_ingredients'].lower().split(',')
    user_preference_ingredients = data['user_preference_ingredients'].lower().split(',')
    print("User allergy ingredients:", user_allergy_ingredients)
    print("User preference ingredients:", user_preference_ingredients)

    recommendations = recommend_recipes(user_allergy_ingredients, user_preference_ingredients)
    print("Recommendations:", recommendations)
    return jsonify(recommendations)

if __name__ == '__main__':
    app.run(host='0.0.0.0' ,port=3001)