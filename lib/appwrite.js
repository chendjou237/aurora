import {Account, Client, ID, Avatars, Databases, Query} from 'react-native-appwrite';

export const config = {
   endpoint: "https://cloud.appwrite.io/v1",
   platform: 'com.xenora.aurora',
   projectId: '6697b5dd00377928a56f',
   databaseId: "669a805f0038d97dfa83",
   userCollectionId: "669a8096000dd3dd7952",
   videoCollectionId: "669a80bf002cf422cbbe",
   storageId: "669a82480002910bcede"
}

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  videoCollectionId,
  storageId
} = config;
// Init your React Native SDK
const client = new Client();
const avatars = new Avatars(client);
client
    .setEndpoint(endpoint) // Your Appwrite Endpoint
    .setProject(projectId) // Your project ID
    .setPlatform(platform) // Your application ID or bundle ID.
;

const account = new Account(client);

const databases = new Databases(client);

export const createUser = async (email, username, password) => {
  try {

    const newAccount =  await account.create(ID.unique(), email, password, username);

      if(!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email , password)

    const newUser = await databases.createDocument(
      databaseId,
        userCollectionId,
        ID.unique(),
        {
            accountId: newAccount.$id,
            email,
            username,
            avatar: avatarUrl
        }

    )
    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }


}

export const  signIn = async (email, password) => {
    try {
        const session = await account.createEmailPasswordSession(
        email, password);
        return session;
    } catch (error) {
        throw new Error(error);

    }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if(!currentAccount) throw Error;
    const currentUser = await databases.listDocuments(
      databaseId,
      userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    );
    if(!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
}

export const getAllPosts = async () => {
  try{
    const posts = await databases.listDocuments(
      databaseId,
      videoCollectionId,
    )
    return posts.documents;
  }
  catch(e){
    console.log(e);

    throw new Error(error)
  }
}
export const getLatestPosts = async () => {
  try{
    const posts = await databases.listDocuments(
      databaseId,
      videoCollectionId,
      [Query.orderDesc('$createdAt',Query.limit(7) )]
    )
    return posts.documents;
  }
  catch(e){
    console.log(e);

    throw new Error(error)
  }
}
