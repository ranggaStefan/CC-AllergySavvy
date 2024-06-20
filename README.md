# Cloud Computing CC-AllergySavvy

This branch is for the Cloud Computing team of our capstone project. Contain some REST APIs to support the backend of the AllergySavvy mobile application features. We also use Google Cloud Platform to use the cloud services. For deployment we use Cloud Run from Google Cloud Platform to save cost.

There are some library we used in this project :
- Firestore
- Firebase
- Node.js v20.13.1
- Hapi v21.3.9
- axios
- JSON Web Token
- Docker

## Installation

If you want to deploy in Cloud Run, make sure you have these installed:
- Node.js v20.13.1
- Google Cloud SDK
- Docker

Then you're ready to go

1. Clone this repository to your Cloud CLI using

        git clone https://github.com/AllergySavvy/CC-AllergySavvy-Dev
2. Authenticate your Google Cloud Platform account and set the project using cloud SDK
   
        gcloud auth login
        gcloud config set project (YOUR_PROJECT_ID)
3. Build the Docker image
   
        gcloud auth configure-docker
        docker build -t gcr.io/(YOUR_PROJECT_ID)/(APP_NAME) .
4. Push the Docker Image
   
        docker push gcr.io/(YOUR_PROJECT_ID)/(APP_NAME)
5. Deploy to Cloud Run (if you are prompted to enable Cloud Run API type **y**)
   
        gcloud run deploy (APP_NAME) --image gcr.io/(YOUR_PROJECT_ID)/(APP_NAME) --platform managed --region (SET_REGION) --allow-unauthenticated

6. Once deployed, the service is ready to be used! Test it in your API request tool e.g. Postman etc.
   

## Features
There are several routes in the backend of this API service based on their features. Here is the route list:

1. `POST /register`        **User Register**  : This endpoint is used to register a new user.
2. `POST /login`           **User Login**     : This endpoint is used to authenticate a user and return a token for accessing protected resources.
3. `GET /user`             **Get User Data**  : This endpoint retrieves the details of a login user. 
4. `PATCH /user/allergies` **Edit Data User** : This endpoint is used to update of the user allergies attribute.
5. `POST /recommendation`  **Get Recomendation (ML Model)** : This endpoint is run ML model from other API.
6. `GET /food/:foodId`     **Get Food Details** : This endpoint is used to return detail food data based on id.
7. `GET /food/random`      **Get Food Random** : This endpoint is used to return 10 random food.
8. `GET /ingredient`       **Get Ingredient Data** : This endpoint is used return all of ingredient data.
9. `GET /ingredient/random`  **Get Ingredient Random** : This endpoint is used to return 10 random ingredient.

For more detail information, you can visit our Postman Documentation on : [API Documentation](https://documenter.getpostman.com/view/33909192/2sA3XQgh2J).

## Contact Information
If you have any questions, feedback, or suggestions related to the cloud computing branch, feel free to reach out to us at :
- Stefanus Rangga Ananta Susanto : stefanusrangga04@gmail.com
- Latifah Putri Simanjuntak :

## Acknowledgements
We would also like to express our deep appreciation to the following individuals for their invaluable contributions to the success of our cloud computing project.

- Stefanus Rangga (Core CC Team)
- Latifah Putri Simanjuntak (Core CC Team)
- Capstone Project Group C241-PS354
- Bangkit Mentor
