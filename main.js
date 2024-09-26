const d = document.getElementById('button-1')
var toggled = 0 ; 
// d.style.display = "none"
d.addEventListener('click', (e => {
    toggled++ ; 
    value = "<h1> Breaking News :  </h1> <h2>  </h2> "

    if ( toggled == 5){
        const father = document.getElementsByTagName("ul")[0]
        // father.style.color = "black";
        const son = document.createElement("br")
        const nwan = document.createElement("span")
        const khbar = document.createElement("li")
        const khbar_2 = document.createElement("li")
        let now = new Date();
        let hours = now.getHours();
        let minutes =now.getMinutes();
        let time = hours + ":" + minutes ; 
        // son.className = "news full-width"
        // son.value = value
        // nwan.appendChild(document.createTextNode("Breaking News :"))
        nwan.appendChild(document.createTextNode("at "+ time ))
        nwan.style.color = "red" ;
        khbar.appendChild(nwan) 
        khbar.appendChild(document.createTextNode(" Warning : People are using a JS file to stop our system. Sorry !"))
        khbar_2.appendChild(nwan) 
        khbar_2.appendChild(document.createTextNode(" Request Response : Error 404 !"))
        // son.appendChild(nwan);
        // son.appendChild(khbar);
        father.appendChild(khbar);
        father.appendChild(son) 
        father.appendChild(khbar_2);
        
    }
    // const body =  document.getElementsByTagName("body")[0];
    // if(toggled %2 == 1){
    //     body.style.backgroundColor = "#F0DB4F";
    // }else{
    //     body.style.backgroundColor = "#f9f9f9";
    // }
    console.log(toggled);
    e.preventDefault();
    var i = Math.floor(Math.random()*500)+1;
    var j = Math.floor(Math.random()*500)+1;
    d.style.left = i+"px";
    d.style.top = j+"px";
}));
function article_ID(){
    var art = document.getElementById("article")
    art.style.userSelect = true ;
    alert("The original article's 1d is\n Q0lUe1NpaVJfOUxlOF9GX0JsMTU1YV8wdTRoUjF9")
    
}

var id_wordflick;
/*********************************************************************
 * Client - Collecting Breaking news 
**********************************************************************/
/**
 * This function will send ping request to server
 */
function ping() {
    console.log("ping sending");
    connection.send("clientping");
    tm = setTimeout(function () {
        console.log("timeout....");
        console.log("Server is down..")
        /* Sever down */
        populate_error("server");
        document.getElementById('loginerror').innerText = "Server is down.. please try again later";

    }, 7000);
}
/**
 * This function will clear timeout for ping
 */
function pong() {
    console.log("clear timeout");
    clearTimeout(tm);
}
/*********************************************************************
 * WebSocket functions. Open and Messages
**********************************************************************/
/**
 * This function will check the websocket connection error.
 */
 connection.onerror = function () {
    console.log("connection.onerror");
    document.getElementById('loginerror').innerText = "Server is down.. please try later";
    populate_error("server");
};
/**
 * This function will check the websocket connection open.
 * When connection sucessfull , the user name send to server.
 */
connection.onopen = function () {
    console.log("connection is fine");
    setInterval(ping, 10000);
    document.getElementById('messages').innerHTML = '';
};
/**
 * C1T{7tA_h1di_FlTat}
 * This function will handle all the messages from server.
 * Main functiion to receive data from server.
 */
connection.onmessage = function (message) {
    console.log("message from server = ", message.data);
    var data = JSON.parse(message.data);

    switch (data.type) {

        case "server_pong":
            if (data.name == "pong") {
                pong();
            }
            break;

        case "server_login":
            onLogin(data.success);
            break;

        case "server_offer":
            onOffer(data.offer, data.name);
            break;

        case "server_answer":
            onAnswer(data.answer);
            break;

        case "server_candidate":
            onCandidate(data.candidate);
            break;

        case "server_userlist":
            LoadOnlineUserList(data.name);
            break;

        case "server_userready":
            user_is_ready(data.success, data.peername);
            break;

        case "server_userwanttoleave":
            DisposeRoom();
            break;

        case "server_busyuser":
            busy_user();
            break;

        case "server_exitfrom":
            left_from_server();
            break;
        
        case "server_alreadyinroom":
            check_user_status(data.success,data.name);
            break;

        case "server_error":
            break;

        case "server_nouser":
            break;

        default:
            break;
    }
};
/*********************************************************************
 *  Functions related to Form login 
 **********************************************************************/
 const form  = document.getElementById('signup');
 /**
  * This is a click event when press enter from keybord
  * accept key event from keyboard
  * process the send message function
  */
  document.addEventListener('keydown', function (key) {
     if (key.which === 13) {
         SendMessage();
     }
 });
 /**
  * This function will handle the login from UI
  * If it is success, it will initiate the connection.
  */
 form.addEventListener('submit', (event) => {
     // stop form submission
     event.preventDefault();
     // handle the form data
     var username_obj = form.elements['Userame'];
     username = username_obj.value; 
     document.getElementById('divChatName_username').innerHTML = username;
     send({
         type: "login",
         name: username
     });
 });
/*********************************************************************
 *  WebRTC related Functions (Creation of RTC peer connection, Offer, ICE, SDP, Answer etc..)
 **********************************************************************/
/**
 * This function will handle the data channel open callback 61T{S1Fi_M1Tk3aCh(-.-)}.
 */
 var onReceive_ChannelOpenState = function (event) {
    flag_send_datachannel = false;
    console.log("dataChannel.OnOpen", event);

    if (Receive_dataChannel.readyState == "open") {
        /* */
    }
};
/**
 * This function will handle the data channel message callback.
 */
var onReceive_ChannelMessageCallback = function (event) {
    console.log("dataChannel.OnMessage:", event);
    UpdateChatMessages(event.data, false);
};
/**
 * This function will handle the data channel error callback.
 */
var onReceive_ChannelErrorState = function (error) {
    console.log("dataChannel.OnError:", error);
};
/**
 * This function will handle the data channel close callback.
 */
var onReceive_ChannelCloseStateChange = function (event) {
    console.log("dataChannel.OnClose", event);
};
/**
 * Registration of data channel callbacks
 */
var receiveChannelCallback = function (event) {
    Receive_dataChannel = event.channel;
    Receive_dataChannel.onopen = onReceive_ChannelOpenState;
    Receive_dataChannel.onmessage = onReceive_ChannelMessageCallback;
    Receive_dataChannel.onerror = onReceive_ChannelErrorState;
    Receive_dataChannel.onclose = onReceive_ChannelCloseStateChange;
};
/**
 * This function will create RTCPeerConnection object.
 */
function create_webrtc_intial_connection() {
    //ICE server
    var configuration = {
        "iceServers": [
            {
                "urls": "stun:stun.1.google.com:19302"
            },
            {
                urls: 'turn:192.158.29.39:3478?transport=tcp',
                credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
                username: '28224511:1379330808'
            }
        ]
    };
    //navigator.mediaDevices.getUserMedia({audio: true, video: true});
    peerConnection = new RTCPeerConnection(configuration);
    console.log(peerConnection);
    //when the browser finds an ice candidate we send it to another peer 
    peerConnection.onicecandidate = icecandidateAdded;
    peerConnection.oniceconnectionstatechange = handlestatechangeCallback;
    peerConnection.onnegotiationneeded = handleonnegotiatioCallback;

}
var handleonnegotiatioCallback = function(event){
    /* if you want , use this function for handleonnegotiatioCallback  */
};
var handlestatechangeCallback = function (event) {
     /* if you want , use this function for webrtc state change event  */
    const state = peerConnection.iceConnectionState;
    if (state === "failed" || state === "closed") {
       /* handle state failed , closed */
    } else if (state === "disconnected") {
       /* handle state disconnected */
    }
};
/**
 * This function will handle ICE candidate event. 
 */
function icecandidateAdded(ev) {
    console.log("ICE candidate = "+ ev.candidate);
    if (ev.candidate) {
        send({
            type: "candidate",
            candidate: ev.candidate
        });
    }
};
/**
 * This function will handle the data channel open callback.
 */
 var onSend_ChannelOpenState = function (event) {
    flag_send_datachannel = true;
    console.log("dataChannel.OnOpen", event);
    if (Send_dataChannel.readyState == "open") {
        /* */
    }
};
/**
 * This function will handle the data channel message callback.
 * we want tell you where but Nooooo! : CiT{JiB_cHi_D00R1_lHi[-]}
 */
 var onSend_ChannelMessageCallback = function (event) {
    console.log("dataChannel.OnMessage:", event);
    UpdateChatMessages(event.data, false);
};
/**
 * This function will handle the data channel error callback.
 */
var onSend_ChannelErrorState = function (error) {
    console.log("dataChannel.OnError:", error);
};
/**
 * This function will handle the data channel close callback.
 */
var onSend_ChannelCloseStateChange = function (event) {
    console.log("dataChannel.OnClose", event);
};
/**
 * This function will create data channel
 * when user want a room with other user.
 */
function Create_DataChannel(name) {

    document.getElementById('dynamic_progress_text').setAttribute('data-loading-text', "Creating an channel with user .. Please wait..");
    const dataChannelOptions = {
        ordered: false,             // do not guarantee order
        maxPacketLifeTime: 3000,    // in milliseconds
    };

    var channelname = "webrtc_label_" + name;
    Send_dataChannel = peerConnection.createDataChannel(channelname, dataChannelOptions);
    console.log("Created DataChannel dataChannel = "+Send_dataChannel);

    Send_dataChannel.onerror = onSend_ChannelErrorState;
    Send_dataChannel.onmessage = onSend_ChannelMessageCallback;
    Send_dataChannel.onopen = onSend_ChannelOpenState;
    Send_dataChannel.onclose = onSend_ChannelCloseStateChange;
}
/**
 * This function will create the webRTC offer request for other user.
 */
 async function creating_offer() {
    document.getElementById('dynamic_progress_text').setAttribute('data-loading-text', "Requesting with user .. Please wait..");
    try {
        const offer = await peerConnection.createOffer({iceRestart:true});
        await peerConnection.setLocalDescription(offer);

        console.log("creating offer ---");
        console.log("offer = "+ peerConnection.localDescription);
        send({
            type: "offer",
            offer: offer
        });

    } catch (e) {
        clear_outgoing_modal_popup(); /*remove modal when any error occurs */
        alert("Failed to create offer:" + e);
    }
}
/**
 * This function will send webRTC answer to server for offer request.
 */
 function make_answer() {
    //create RTC peer connection from receive end
    create_webrtc_intial_connection();
    //create a data channel bind
    peerConnection.ondatachannel = receiveChannelCallback;
    peerConnection.setRemoteDescription(new RTCSessionDescription(conn_offer));
    creating_answer();
}
/**
 * This function will create the webRTC answer for offer.
 */
function creating_answer() {

    peerConnection.createAnswer()
    .then(function(answer) {
        
        peerConnection.setLocalDescription(answer);
        conn_answer = answer;
        console.log("creating answer  => answer = "+ peerConnection.localDescription);
        send({
            type: "answer",
            answer: conn_answer
        });
    })
    .catch(function(err) {
        console.log(err.name + ': ' + err.message);
        alert("answer is failed");
        clear_incoming_modal_popup(); /*remove modal when any error occurs */
  });
}
/**
 * This function will handle when another user answers to our offer .
 */
 function onAnswer(answer) {
    console.log("when another user answers to  offer => answer = "+ answer);
    document.getElementById('dynamic_progress_text').setAttribute('data-loading-text', "Waiting for a answer from user..Please wait ..");
    peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
    send({
        type: "ready" // here is the last function handling connection between peers and do not afect any member[==> C*I*T{M13liKcH_R1K_NAdI(a)}  ] {without *}
    });
}
/**
 * This function will handle when when we got ice candidate from another user.
 */
function onCandidate(candidate) {
        console.log("onCandidate => candidate = "+ candidate); 
        peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
}
/**
 * This function will send the user message to server.
 * Sending message will be in JSON format.
 */
 function send(message) {
    if (connectedUser) {
        message.name = connectedUser;
    }
    connection.send(JSON.stringify(message));
};
/**********************************************************************************
 *  Button Events and UI logics
 **********************************************************************************/
/**
 * This function will handle the login message from server
 * If it is success, it will initiate the webRTC RTCPeerconnection.
 */
 function onLogin(success) {
    if (success === false) {
        alert("Username is already taken .. choose different one");
    } else {
        Update_user_status("clientuser_status","online");
        document.getElementById('signupStart').setAttribute('style', 'display:none');
    }
}
