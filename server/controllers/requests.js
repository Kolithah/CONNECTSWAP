import ExcahngeScheme from "../models/exchangeSchema.js";
import requestScheme from "../models/requests.js";
import mongoose from "mongoose";

export const createExchangeScheme = async (req, res) => {
  const id = req.userId;

  const {
    governUniversity,
    stateOrPrivate,
    category,
    profession,
    district,
    workPlace,
    workPlaceLocation,
    target,
    targetPlaces,
    isPublic,
    title,
    postBody,
    university,
    faculty,
    targetUniversities,
  } = req.body;
  try {
    const result = await ExcahngeScheme.create({
      owner: id,
      governUniversity,
      stateOrPrivate,
      category,
      profession,
      district,
      workPlace,
      workPlaceLocation,
      target,
      targetPlaces,
      isPublic,
      title,
      postBody,
      university,
      faculty,
      targetUniversities,
    });

    res.status(201).json({ result });
  } catch (error) {
    console.log(error.message);
    res.status(403);
  }
};

export const getSchemes = async (req, res) => {
  const userId = req.userId;

  try {
    const result = await ExcahngeScheme.find({ owner: userId });
 
    res.status(200).json(result);
  } catch (e) {
    console.log(e.message);
    res.status(500);
  }
};

export const makePost = async (req, res) => {
  const userId = req.userId;
  const { title, description, createdAt } = req.body;
  const schemeCode = req.params.id;
 

  try {
    if (!mongoose.Types.ObjectId.isValid(schemeCode))
      return res.status(405).send(`No post with id: ${schemeCode}`);

    const Scheme = await ExcahngeScheme.findById(schemeCode);

    if (!Scheme)
      return res.status(410).json({ message: "Scheme doesn't exist" });
    if (Scheme.owner != userId)
      return res.status(401).json({ message: "Unauthorized" });
    if (Scheme.isPublic == true)
      return res.status(400).json({ message: "Already made" });
    await ExcahngeScheme.findByIdAndUpdate(
      schemeCode,
      { isPublic: true, title, postBody: description, createdAt },
      { new: true }
    );
    res.status(200).json({ message: "Successful" });
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error.message });
  }
};

export const getPosts = async (req, res) => {
  try {
    const postMessages = await ExcahngeScheme.find({ isPublic: true }).populate(
      "owner",
      "name"
    );

    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const setRequest = async (req, res) => {
  const postId = req.params.id;
 
  const userId = req.userId;

  try {
    const post = await ExcahngeScheme.findById(postId);
    if (!post || !post?.isPublic)
      return res.status(400).json({ message: "No such post" });
    if (!mongoose.Types.ObjectId.isValid(userId))
      return res.status(401).send(`Not a valid user`);
    const index = post.requests.findIndex((id) => id.user == userId);

    //-1 means request not found
    if (index === -1) {
      console.log(post);
      post.requests.push({ user: userId, state: false });
      await requestScheme.create({
        users: [
          { user: userId, reqStatus: 1 },
          { user: post.owner, reqStatus: 2 },
        ],
        exchangeScheme: post._id,
        notificationsB: [{ state: 1, time: new Date() }],
        messages: [
          {
            message: req.body.message,
            user: 0,
            time: new Date(),
          },
        ],
      });
    } else if (post.requests[index].state) {
      //means that the post owner has already accepted the request, therefore request is igonred
    } else {
      //means that you have already made the request, therefore request is deleted
      //first request is filtered from the post
      post.requests = post.requests.filter((id) => id.user != String(userId));
  
      //then the request is deleted from requestscheme
      await requestScheme.findOneAndDelete({
        users: {
          $elemMatch: {
            user: userId,
            reqStatus: 1,
          },
        },

        exchangeScheme: postId,
      });
     
    }
    //post updated
    const updatedPost = await ExcahngeScheme.findByIdAndUpdate(postId, post, {
      new: true,
    });
    res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
};

export const proceedRequest = async (req, res) => {
  //procceedRequest is for interaction between user and post owner
  //userID can be post owner or the other user
  //new state is the number state sent by the frontend to the backend informing about new user's state
  const newState = req.body.newState;
  const userId = req.userId;
  console.log("newState", newState);
  const requestId = req.params.id;
  try {
    //find the request
    const request = await requestScheme.findById(requestId);
    //checks if the request exists
    if (!request) return res.status(400).json({ message: "No such request" });
    //checks if the user is an actual user
    if (!mongoose.Types.ObjectId.isValid(userId))
      return res.status(401).send(`Not a valid user`);

    //find the user index to check if the user is the owner of the request or the other user
    const val = request.users.findIndex((e) => e.user == userId);
     
    //Now we check the state of the new proceeded request
    switch (newState) {
      case 3: {
        const post = await ExcahngeScheme.findById(request.exchangeScheme);
        if (!post || !post?.isPublic)
          return res.status(400).json({ message: "No such post" });
         
        const arr = request.users.map((e) => (e.reqStatus = 3));
        request.users = arr;
        ExcahngeScheme.findOneAndUpdate(
          { _id: request.exchangeScheme, 'requests.user':request.users[0].user },
          { $set: { 'requests.$.state': true} },
          { new: true }
        )
          .then(updatedDocument => {
            console.log('Updated document:', updatedDocument);
          })
          .catch(error => {
            console.error('Error updating document:', error);
          });
        
        if (val == 1) {
          request.notificationsA.push({ state: 2, time: new Date() });
        } else {
          request.notificationsB.push({ state: 2, time:new Date() });
        }
        break;
      }
      case 4: {
        console.log("came here")
        request.users[val].reqStatus = 4;
        request.users[1 - val].reqStatus = 5;
        if (val == 1) {
          request.notificationsA.push({ state: 4, time: new Date() });
        } else {
          request.notificationsB.push({ state: 4, time: new Date() });
        }
        break;
      }
      case 6: {
        //means user and post owner have confirmed the exchange
        const arr = request.users.map((e) => (e.reqStatus = 6));
        request.users = arr;
        if (val == 1) {
          request.notificationsA.push({ state: 5, time: new Date() });
        } else {
          request.notificationsB.push({ state: 5, time: new Date() });
        }
          //now we make all the requests from the other user dismissed
        const filter = {
          _id: { $ne: requestId },
          exchangeScheme: request.exchangeScheme,
        };
        const update = { $set: { "users.$[0].state": 10 ,} };
        const update0 = { $set: { "users.$[1].state": 11 } };
        const update1 =  { $push: { notificationsA: { state:7, time: new Date() } }};

        await requestScheme.updateMany(filter, update);
        await requestScheme.updateMany(filter, update0);
        await requestScheme.updateMany(filter, update1);
        break;
      }
      case 7: {
        request.users[val].reqStatus = 7;
        request.users[1 - val].reqStatus = 8;
        ExcahngeScheme.findByIdAndUpdate(
          request.exchangeScheme,
          { $pull: { requests: { user: request.users[0].user } } },
          { new: true }
        )
          .then(updatedDocument => {
            console.log('Updated document:', updatedDocument);
          })
          .catch(error => {
            console.error('Error updating document:', error);
          });
        if (val == 1) {
          request.notificationsA.push({ state: 6, time: new Date() });
        } else {
          request.notificationsB.push({ state: 6, time: new Date() });
        }
        break;
      }
      case 9: {
        console.log("came here to 9")
        request.users[val].reqStatus = 3;
        request.users[1 - val].reqStatus = 3;
        if (val == 0) {
          const notif = request.notificationsA.filter((e) => e.state != 4);
          request.notificationsA = notif;
        } else {
          const notif = request.notificationsB.filter((e) => e.state != 4);
          request.notificationsB = notif;
        }
        break;
      }

      default:
        break;
    }
    const updatedRequest = await requestScheme.findByIdAndUpdate(
      requestId,
      request,
      {
        new: true,
      }
    );
   
    res.status(200).json(updatedRequest);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error" });
  }
};


export const getUsersRequests = async (req, res) => {
  const userId = req.userId;
 
  try {
    const requests = await requestScheme.find({ users: { $elemMatch: { user: userId } } }).populate("exchangeScheme").populate("users.user");
   
    res.status(200).json(requests);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error" });
  }
};

export const getRequest = async (req, res) => {
  const requestId = req.params.id;
  console.log(requestId);
  try {
    const request = await requestScheme.findById(requestId).populate("exchangeScheme").populate("users.user");


    res.status(200).json(request);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error" });
  }
}

export const sendMessage = async (requestId, userId, message, time) => {

  requestScheme.findByIdAndUpdate(
    requestId,
    { $push: { messages: { message, user: userId, time } } },
    { new: true }
  )
    .then(updatedDocument => {
      console.log('Updated document:', updatedDocument);
    })
    .catch(error => {
      console.error('Error updating document:', error);
    });
  
}
