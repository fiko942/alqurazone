import {
   Text,
   ScrollView,
   View,
   TouchableOpacity,
   Image,
   Dimensions,
   FlatList
} from 'react-native'
import BackIcon from '../../icons/back-icon.png'
import { useNavigation } from '@react-navigation/native'
import Sound from 'react-native-sound'
import * as Progress from 'react-native-progress';
import { useEffect, useState } from 'react';

import PauseIcon from '../../icons/pause.png'
import PlayIcon from '../../icons/play.png'
import StopIcon from '../../icons/stop.png'

var audios = []

const stop_all_audios = () => {
   console.log('Stopping all audios')
   for(var audio of audios) {
      audio.stop()
   }
   console.log('stop finished')
}

export default function Main({surah, range, data}) {
   return (
      <>
         <Header surah={surah} range={range} />
         <Body data={data} />
      </>
   )
}

function IconButton({onPress, Icon}) {
   return (
      <View style={{width: 30, height: 30}}>
         <TouchableOpacity onPress={onPress}>
            <Image source={Icon} style={{width: 30, height: 30}} />
         </TouchableOpacity>
      </View>
   )
}

function Audio({src, width}) {
   const [audio, setAudio] = useState(undefined)
   const [playing, setPlaying] = useState(false)

   const init = (callback) => {
      const _audio = new Sound(src, null, err => {
         if (err) {
            const msg = `Failed for load audio from source`
            return
         }

         audios.push(_audio)
         callback(_audio)
      })
   }

   const playToggle = () => {

      const toggling = (audio) => {
         if(playing) {
            audio.pause()
         } else {
            stop_all_audios()
            audio.play(() => {
               setPlaying(false)
            })
         }
         setPlaying(!playing)
      }

      if (typeof audio == 'undefined') {
         init((audio) => {
            setAudio(audio)
            toggling(audio)
         })
      } else {
         toggling(audio)
      }
   }
   
   const handleStop = () => {
      audio.stop()
      setPlaying(false)
   }

   return (
      <View style={{flexDirection: 'row', marginTop: 8}}>
         <IconButton Icon={playing ? PauseIcon : PlayIcon}  onPress={playToggle.bind(this)} />
         {playing && (
            <IconButton Icon={StopIcon}  onPress={handleStop.bind(this)} />
         )}
      </View>
   )
}

function Item({data, width}) {
   return (
      <View style={styles.itemContainer}>
         <Text style={styles.itemArabText}>{data.arab}</Text>
         <Text style={styles.itemLatinText}>{data.translation}</Text>
         <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
         }}>
            <Audio src={data.audio['alafasy']} width={width}  />
         </View>
      </View>
   )
}

function Body({data}) {
   const {width, height} = Dimensions.get('window')

   useEffect(() => {
      return () => {
         stop_all_audios()
      }
   }, [])

   return (
      // <ScrollView>
         <FlatList
         contentContainerStyle={{maxWidth: width}}
            data={data}
            renderItem={({item}) => (
               <Item data={item} width={width} />
            )}
            removeClippedSubviews={false}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            updateCellsBatchingPeriod={100}
         />
      // </ScrollView>
   )
}

function Back() {
   const navigation = useNavigation()
   const handleBack = () => {
      if (navigation.canGoBack()) {
         navigation.goBack()
      }
   }
   return (
      <TouchableOpacity onPress={handleBack.bind(this)}
      style={{width: 30, height: 30}}>
         <Image source={BackIcon} style={{
            width: 30,
            height: 30
         }} />
      </TouchableOpacity>
   )
}

function Header({surah, range}) {

   return (
      <View style={styles.header}>
         <Back />
         <Text style={{marginLeft: 10, color: '#fff', fontSize: 16, fontWeight: 500}}>{surah.name} ({range[0]} - {range[1]})</Text>
      </View>
   )
}

const styles = {
   header: {
      backgroundColor: '#239289',
      width: '100%',
      height: 40,
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      color: '#fff'
   },
   itemContainer: {
      marginTop: 12,
      marginBottom: 12,
      padding: 3
   },
   itemArabText: {
      fontWeight: 500,
      fontSize: 25,
   },
   itemLatinText: {
      fontSize: 13
   }
}