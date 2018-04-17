import { AppRegistry } from 'react-native';
import index from './app/index';

if (typeof process === 'undefined') process = {};
process.nextTick = setImmediate;

module.exports = process;

AppRegistry.registerComponent('RNApp', () => index);
