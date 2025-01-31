import {Account, Client, ID, Avatars, Databases, Query, Storage} from 'react-native-appwrite';

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

const storage = new Storage(client)

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
      [Query.orderDesc('$createdAt', )]
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
export const searchPosts = async (query) => {
  try{
    const posts = await databases.listDocuments(
      databaseId,
      videoCollectionId,
      [Query.search('title',query )]
    )
    return posts.documents;
  }
  catch(e){
    console.log(e);

    throw new Error(error)
  }
}
export const getUserPosts = async (userId) => {
  try{
    const posts = await databases.listDocuments(
      databaseId,
      videoCollectionId,
      [Query.equal('users',userId ),       Query.orderDesc('$createdAt', )
   ]
    )
    return posts.documents;
  }
  catch(e){
    console.log(e);

    throw new Error(error)
  }
}

export const signOut = async ( ) =>{
   try {
      const session = await account.deleteSession('current');
      return session
   } catch (error) {
      throw new Error(error);

   }
}

export const getFilePreview = async (fileId, type) => {
   let fileUrl;
   try {
      if(type === 'image'){
         fileUrl = storage.getFilePreview(storageId, fileId, 2000, 2000, 'top', 100)
      }
      else if(type === 'video'){
         fileUrl = storage.getFileView(storageId, fileId)
      }
      else {
         throw new Error('Invalid file type')
      }
      if(!fileUrl) throw Error;
      return fileUrl;
   } catch (error) {
      throw new Error(error);
   }
}
export const uploadFile =async  (file, type) => {
   if(!file) return;
   console.log('file', file);

   const asset = {
      name: 'image',
      type: file.mimeType,
      size: file.fileSize,
      uri: file.uri,
   }
console.log('asset', asset);

   try {
const uploadedFile = await storage.createFile(
   storageId, ID.unique(), asset
);
console.log('uploadedFile', uploadedFile);
const fileUrl = await getFilePreview(uploadedFile.$id, type)
return fileUrl;
   } catch (error) {
      console.error(error);
      throw new Error(error);

   }

}

 export const createVideo = async (form) => {
   try {
      const [thumbnailUrl, videoUrl] = await Promise.all([
         uploadFile(form.thumbnail, 'image'),
         uploadFile(form.video, 'video'),
      ])

      const newPost = await databases.createDocument(
         databaseId,
         videoCollectionId,
         ID.unique(),

         {
            title: form.title,
            thumbnail: thumbnailUrl,
            video: videoUrl,
            prompt: form.prompt,
            users: form.userId,
         }
      )
      return newPost;
   } catch (error) {
      throw new Error(error);
   }
}
