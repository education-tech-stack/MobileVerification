/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
import * as firebase from 'firebase';
firebase.initializeApp({
    apiKey: "AIzaSyA-jl_DSilmjFQvAQ56rXbUH9iWS2KMb2I",
    authDomain: "mobileverification-35220.firebaseapp.com",
    projectId: "mobileverification-35220",
    storageBucket: "mobileverification-35220.appspot.com",
    messagingSenderId: "86788140562",
    appId: "1:86788140562:web:550f0402b132a97d4532cb",
    measurementId: "G-J4NXTT71BB"
  });

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);

    var my_verificationId;
    var otp = document.getElementById("otp").value;
    
    function send(){
        window.FirebasePlugin.verifyPhoneNumber("+919911667133", 60, function(credential) {
            alert("sms sent"+credential);
            console.log(credential);
            my_verificationId = credential.verificationId;
        }, function(error) {
            console.error(error);
        });
    }
    function verify(){
        var signInCredential = firebase.auth.PhoneAuthProvider.credential(my_verificationId, otp);

        firebase.auth().signInWithCredential(signInCredential).then(function(info){
            console.log(info);
        }, function(error){
            console.error(error);
        })
    }
}
