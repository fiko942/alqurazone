import {
   ImageBackground
} from 'react-native'

export default function Background({children}) {
   return (
      <ImageBackground source={require('../../../../assets/image/islamic_bg.jpg')}>
         {children}
      </ImageBackground>
   )
}