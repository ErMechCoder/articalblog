import admin from "firebase-admin"
// const serviceAccount = import ("./uiib-phone-app-a-firebase-adminsdk-3rtpn-0e16d43003.json");
import serviceAccount from "./react-push-e2ef8-firebase-adminsdk-u7mfa-acb1055f87.json" assert {type:'json'}


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});



const options = {
    priority: "high",
    timeToLive: 60 * 60 * 24,
  };

  const payload = {
    notification: {
      title: "Membership expiring in 30 days",
      body: `Dear  your Membership is going to expire within 30 days please renew your plan to avail our services.`,
    },
  };

export const sendNotification = async (message) => {
    const token="e7JB3DznsaqeDJVWZ1yCKB:APA91bHMNUIzGANUEUqUVMG53UrluKS76W8DGYT_x-SItDl8lwvUfZKECqdOiyeYGWYjp4z5LCCYd7u7Qp_bm4em5jLZEG7TqSord2USs5h0OnYsufvqoJWMWCH-RFXqziFKzyadsXBF"
    await admin
    .messaging()
    .sendToDevice(token, payload, options)
    .then((res) => console.log(res));
    console.log(response);
}


export default admin;