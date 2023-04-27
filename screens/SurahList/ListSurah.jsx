import {
   Text,
   TouchableOpacity,
   StyleSheet,
   View
} from 'react-native'


export default function ListSurah({surah, onOpenSurah}) {
   const handle_on_press = () => {
      onOpenSurah(surah)
   }

   return (
         <TouchableOpacity style={styles.button} onPress={handle_on_press.bind(this)}>
            <Text style={styles.text}>{surah.number}) {surah.name} - <Text style={styles.translation}>{surah.translation}</Text></Text>
         </TouchableOpacity>
   )
}


const styles = StyleSheet.create({
   translation: {
      color: 'rgba(255,255,255,0.5)',
      fontSize: 15
   },
   button: {
      flex: 1,
      backgroundColor: '#609966',
      borderRadius: 8,
      paddingVertical: 5,
      paddingHorizontal: 10,
      width: '97%',
      marginLeft: '1.5%',
      marginTop: 5,
      marginBottom: 5
   },
   text: {
      color: "#fff",
      fontSize: 20
   }
})