import {
   View,
   Text,
   ActivityIndicator
} from 'react-native'

export default function Loading({message}) {
   return (
      <View style={{
         width: '100%',
         height: '100%',
         backgroundColor: 'transparent',
         flexDirection: 'row',
         justifyContent: 'center',
         }}>   
         <ActivityIndicator size='large' />
         <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{marginTop: 70}}>{message}</Text>
         </View>
      </View>  
   )
}