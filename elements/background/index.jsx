import {
   ImageBackground
} from 'react-native'

export default function Background({children}) {
   return (
      <ImageBackground
      style={{
         width: '100%',
         height: '100%',
      }}
      source={require('../../assets/image/islamic_bg.jpg')}>
         {children}
      </ImageBackground>
   )
}