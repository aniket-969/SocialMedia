import { ID } from "appwrite";
import { account, appwriteConfig, avatars, databases,storage } from "./config";
import { Query} from "appwrite"

export async function createUserAccount(data) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      data.email,
      data.password,
      data.name
    );

    if(!newAccount) throw Error

const avatarUrl = avatars.getInitials(data.name)

const newUser = await saveUserToDB({
  accountid:newAccount.$id,
  name:newAccount.name,
  email:newAccount.email,
  username:data.username,
  imageUrl:avatarUrl
})

    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function saveUserToDB({accountid,email,name,imageUrl,username}){
   try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {accountid,
      email,
      name,imageUrl,username}

    )
    return newUser
   } catch (error) {
    console.log(error);
    
   }
}

export async function signInUser(data){
  try {
    const response =  await account.createEmailSession(data.email,data.password)
    console.log(response);
    
    return response
  } catch (error) {
    console.log(error);
    
  }
}

export async function signOutUser(){
  try {
   return await account.deleteSessions()
  } catch (error) {
    console.log(error);
  }
} 

export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    console.log(error);
  }
}

export async function getCurrentUser(){
  try {
    const currentAccount = await getAccount()

    if(!currentAccount) throw error

  const currentUser = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.userCollectionId,
    [Query.equal('email',currentAccount.email)]
  )

  if(!currentUser) throw error

  return currentUser.documents[0]

  } catch (error) {
    console.log(error);
  }
  return null;
}

export async function createPost({title,desc,name,username,imageId,userId}){
      try {
        return await databases.createDocument(appwriteConfig.databaseId,
          appwriteConfig.postCollectionId,
          ID.unique(),
          {title,desc,name,username,imageId,userId}
          )
      } catch (error) {
       console.log(error);
        
      }
}

export async function createComment(id,name,username,comment,userId){
  try {
    const commentData = await databases.createDocument(appwriteConfig.databaseId,
      appwriteConfig.commentsCollectionId,
      ID.unique(),
      {postId:id,name,username,comment,userId}
      )
      if(commentData) return commentData
      throw error
  } catch (error) {
    console.log(error);
    
  }
}
 
export async function createLikes(postId,userId){
    try {
      const likeData = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.likesCollectionId,
        ID.unique(),
        {postId,userId}
      )
      if(likeData) return likeData
      throw error
    } catch (error) {
      console.log(error);
      
    }
}

export async function removeLike(likeId){
  try {
    await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.likesCollectionId,
      likeId
    )
    return true
  } catch (error) {
    console.log(error);
    
  }
}

export async function deletePost(docId){
  try {
    await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      docId
    )
    return true
  } catch (error) {
    console.log(error);
    
  }
}

export async function uploadFile(file){
  try {
    return await storage.createFile(
        appwriteConfig.bucketId,
        ID.unique(),
        file
    )
} catch (error) {
    console.log("Appwrite serive :: uploadFile :: error", error);
    return false
}
}

export async function getFilePreview(fileId){
 
    return storage.getFilePreview(
        appwriteConfig.bucketId,
        fileId
    )
 
}

export async function getAllPosts(){

  const queries = [Query.orderDesc("")]

  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      queries

    )
    if(posts) return posts
     throw error
  } catch (error) {
    console.log(error);
    
  }
}

export async function getPost(postId){
  try {
    return await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      postId
    )
  } catch (error) {
    console.log(error);
    
  }
}

export async function getUserPosts(userId){
  try { 
    return await databases.listDocuments(
      appwriteConfig.databaseId,appwriteConfig.postCollectionId,
     [ Query.equal('userId', userId)]
    )
  } catch (error) {
    console.log(error);
    
  }
}

export async function getLikes(likepostId){
  try { 
    return await databases.listDocuments(
      appwriteConfig.databaseId,appwriteConfig.likesCollectionId,
     [ Query.equal('postId', likepostId)]
    )
  } catch (error) {
    console.log(error);
    
  }
}

export async function getOneLike(postId,userId){
  try {
    return await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.likesCollectionId,
      [Query.equal('postId',postId),
      Query.equal('userId',userId)]
    )
  } catch (error) {
    console.log(error);
    
  }
}

export async function getPostComments(postId){
  try {
    return await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.commentsCollectionId,
      [Query.equal('postId',postId)]
    )
  } catch (error) {
    console.log(error);
    
  }
}