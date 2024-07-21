import {Account, Client, ID} from 'react-native-appwrite';
import { Client } from 'react-native-appwrite';
export const appwriteConfig = {
   endpoint: "https://cloud.appwrite.io/v1",
   platform: 'com.xenora.aurora',
   projectId: '6697b5dd00377928a56f',
   databaseId: "669a805f0038d97dfa83",
   userCollectionId: "669a8096000dd3dd7952",
   videoCollectionId: "669a80bf002cf422cbbe",
   storageId: "669a82480002910bcede"
}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform) // Your application ID or bundle ID.
;

const account = new Account(client);

export const createUser = () => {
   account.create(ID.unique(), 'me@example.com', 'password', 'Jane Doe')
   .then(function (response) {
       console.log(response);
   }, function (error) {
       console.log(error);
   });

}

// Register User


