import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { GoogleSignin } from 'react-native-google-signin';

import ddpClient from '../ddp';

class SignOut extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null
    }
  }

  componentDidMount() {
    ddpClient.user()
    .then((user) => {
      this.setState({user})
    })
  }

  handleSignOut() {
    GoogleSignin.revokeAccess()
    .then(() => {
      // GoogleSignin.signOut()
      ddpClient.logout(() => {
        this.props.changedSignedIn(false);
      });
    })
    // .then(() => {
    //   this.setState({user: null});
    // })
    // .done();
    .catch((err) => {
      console.log("SignOut Error: ", err);
    });
  }

  render() {
    let { user } = this.state;
    if (user) {
      let name = user.name;
      let email = user.email;
    }

    return(
      <View style={styles.container}>
        <Text>Welcome {name}</Text>
        <Text>Email: {email}</Text>

        <TouchableOpacity style={styles.touchButton} onPress={this.handleSignOut.bind(this)}>
          <Text style={styles.touchText}>Log Out</Text>
        </TouchableOpacity>
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

export default SignOut;
