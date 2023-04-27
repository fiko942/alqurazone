import {
   Modal,
   View,
   Text,
   StyleSheet,
   TextInput
} from 'react-native'
import {useEffect, useState} from 'react'
import {Checkbox, RadioButton} from 'react-native-paper'
import CheckBox from '@react-native-community/checkbox'
import { Picker } from '@react-native-picker/picker'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

export default function BeforeOpenSurahModal({open, onClose, surah}) {
   const [type, setType] = useState('all')
   const [range, setRange] = useState([1, 2])
   const navigation = useNavigation()

   const types = [{
      id: 'all',
      value: 'Semua ayah'
   }, {
      id: 'range',
      value: 'Range'
   }]

   useEffect(() => {
      if(typeof surah == 'object') {
         setRange([1, surah.numberOfAyahs])
      }
   }, [surah, type])
   
   const openSurah = () => {
      onClose()
      navigation.navigate('surah-detail', {
         surah,
         range,
      })
   }


   return (
      <Modal animationType='fade' visible={open} onRequestClose={onClose.bind(this)} transparent={true}>
         <View style={styles.wrapper} onStartShouldSetResponder={onClose.bind(this)} activeOpacity={10} />

         <View style={{...styles.container}}>
            <Text style={styles.titleText}>
               Buka Surah
            </Text>
            <View style={styles.body}>
               <Text style={styles.bodyTitle}>Seleksi Ayah's</Text>
               
               {types.map((_type, i) => (
                  <View style={{...styles.rowCheckbox, ...i==0?styles.mt2:{}}}>
                     <CheckBox onValueChange={x => setType(_type.id)} value={_type.id == type} />
                     <Text style={styles.CheckboxText}>{_type.value}</Text>
                  </View>
               ))}
            <RangeView type={type} visible={type == 'range'} min={range[0]} range={range} max={surah ? surah.numberOfAyahs : 2} onRangeChange={x => setRange(x)} />
            <View style={styles.buttonContinueContainer} onStartShouldSetResponder={openSurah.bind(this)}>
               <TouchableOpacity style={styles.buttonContinue}>
                  <Text style={styles.buttonContinueText}>Lanjutkan</Text>
               </TouchableOpacity>
            </View>
            </View>
         </View>

      </Modal>
   )
}

function RangeView({visible, range, min, max, onRangeChange, type}) {
   const [ranges, setRanges] = useState([])
   const [rangeFrom, setRangeFrom] = useState(min || 1)
   const [rangeTo, setRangeTo] = useState(max)

   useEffect(() => {
      setRangeFrom(range[0])
   }, [range])

   useEffect(() => {
      const minProps = {min: 1, max: max}
      setRanges(getRange(minProps))
   }, [range, type]) 

   useEffect(() => {
      if(!visible) {
         onRangeChange([1, max])
      }
   }, [visible])

   useEffect(() => {
      onRangeChange([rangeFrom, rangeTo])
   }, [rangeFrom, rangeTo])
   

   const handleValueFromChange = x => setRangeFrom(x)
   const handleValueToChange = x => setRangeTo(x)

   return visible && (
      <View style={styles.range}>   
         <View style={styles.pickerCell}>
            <Text style={styles.pickerText}>Mulai</Text>
            <Picker selectedValue={rangeFrom} onValueChange={handleValueFromChange.bind(this)}>
               {ranges.map((x, i) => (
                  <Picker.Item label={x.toString()} value={x} key={i} />
               ))}
            </Picker>
         </View>
         <View style={styles.pickerCell}>
            <Text style={styles.pickerText}>Sampai</Text>
            <Picker selectedValue={rangeTo} onValueChange={handleValueToChange.bind(this)}>
               {ranges.map((x, i) => (
                  <Picker.Item label={x.toString()} value={x} key={i} />
               ))}
            </Picker>
         </View>
      </View>
   )
}

const getRange = ({min, max}) => {
   var x = []
   for(var i = min; i <= max; i++) {
      x.push(i)
   }
   return x
}

const styles = StyleSheet.create({
   buttonContinueText: {
      color: '#fff',
      fontWeight: 600,
      fontSize: 16
   },
   buttonContinueContainer: {
      alignSelf: 'flex-start',
      marginLeft: 'auto',
      marginRight: 0,
      marginTop: 10,
      borderRadius: 6
   },
   buttonContinue: {
      backgroundColor: '#239289',
      alignItems: 'center',
      paddingHorizontal: 12,
      paddingVertical: 7,
      fontSize: 16,
      borderRadius: 9,
   },
   pickerText: {
      position: 'absolute',
      top: 3,
      left: 5,
   },
   pickerCell: {
      paddingTop: 4,
      backgroundColor: 'red',
      flex: .5,
      backgroundColor: 'rgba(0,0,0,0.2)',
      borderRadius: 10,
      position: 'relative'
   },
   range: {
      flexDirection: 'row',
      gap: 10,
      marginTop: 10
   },
   CheckboxText: {
      letterSpacing: .8,
      fontSize: 17,
      color: 'rgba(0,0,0,0.9)',
      fontWeight: 300
   },
   mt2: {marginTop: 20},
   rowCheckbox: {
      position: 'relative',
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      maxHeight: 30,
   },
   body: {
      width: '100%',
      marginTop: 10,
      height: 350
   },
   bodyTitle: {},
   titleText: {
      fontWeight: 500,
      fontSize: 17,
      color: '#000'
   },
   wrapper: {
      width: '100%',
      height: '100%',
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      opacity: 1,
      zIndex: 10
   },
   container: {
      zIndex: 50,
      opacity: 1,
      backgroundColor: "#fff",
      borderRadius: 10,
      paddingHorizontal: 10,
      paddingVertical: 8,
      position: 'absolute',
      width: '100%',
      height:300,
      bottom: 0,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0
   },
})