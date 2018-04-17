import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { GoogleSignin } from 'react-native-google-signin';

import ddpClient from '../ddp';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      GoogleSignin.currentUserAsync()
      .then((user) => {
        this.handleDPPSignIn(user)
      })
      .done();
    }
  }

  handleDPPSignIn(googleUser) {
    if (googleUser) {
      ddpClient.loginWithGoogle(googleUser, (err, res) => {
        if (err) {
          this.setState({ error: err.reason })
        } else {
          this.props.changedSignedIn(true);
        }
      })
    }
  }

  handleGoogleSignIn() {
    GoogleSignin.signIn()
    .then((user) => {
      console.log(user);
      this.handleDPPSignIn(user);
    })
    .catch((err) => {
      this.setState({ error: err.message });
      console.log("Error: ", err.message);
    })
    .done();
  }


  render() {
    return(
      <View style={styles.container}>
        <TouchableOpacity style={styles.touchButton} onPress={this.handleGoogleSignIn.bind(this)}>
          <Text style={styles.touchText}>SignIn with Google</Text>
        </TouchableOpacity>

        <Text>{this.state.error}</Text>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  touchButton: {
    width: 320,
    height: 54,
    backgroundColor: "#fff",
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#a8a8a8',
    marginBottom: 12,
    elevation: 2
  },
  touchText:{
    fontSize: 18,
    fontWeight: '500'
  },
}

export default SignIn;
