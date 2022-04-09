import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getFirestore } from "firebase/firestore";

import { Navigator } from '../constants';
import { app } from '../firebase';

export const RegisterScreen = ({ navigation }) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const handleRegister = () => {
        if (password === confirmPassword) {
            const auth = getAuth();
            // Initialize Cloud Firestore and get a reference to the service
            const db = getFirestore(app);

            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;

                    // Store user information into firestore
                    var userData = {
                        id: user.uid,
                        email,
                        fullName
                    };
                    // Add a new user document in collection "users"
                    setDoc(doc(db, "users", userData.id), userData)
                        .then((response) => {
                            alert("Thành công")
                            console.log(response)
                        }).catch((e) => alert(e.message));

                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ..
                });
        }
    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <TextInput
                    style={styles.input}
                    placeholder='Full Name'
                    placeholderTextColor="#aaaaaa"
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    value={fullName}
                    onChangeText={(v) => setFullName(v)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={(v) => setEmail(v)}
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    value={password}
                    onChangeText={(v) => setPassword(v)}
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Confirm Password'
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    value={confirmPassword}
                    onChangeText={(v) => setConfirmPassword(v)}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleRegister}
                >
                    <Text style={styles.buttonTitle}>Create account</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Already got an account?{' '}
                        <Text
                            style={styles.footerLink}
                            onPress={() => navigation.navigate(Navigator.login)}
                        >
                            Log in
                        </Text>
                    </Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    title: {

    },
    logo: {
        flex: 1,
        height: 120,
        width: 90,
        alignSelf: "center",
        margin: 30
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
    },
    button: {
        backgroundColor: '#788eec',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    footerView: {
        flex: 1,
        alignItems: "center",
        marginTop: 20
    },
    footerText: {
        fontSize: 16,
        color: '#2e2e2d'
    },
    footerLink: {
        color: "#788eec",
        fontWeight: "bold",
        fontSize: 16
    }
})