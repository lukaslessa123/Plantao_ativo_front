import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View } from 'react-native'
import { Button } from 'react-native-paper'
import {useEffect} from 

function Home() {

  const navigation = useNavigation()

  return (
    <View style={{ padding: 16 }}>
      
      <Button style={{ marginTop: 16 }} onPress={() => navigation.navigate('CEP')}>CEP</Button>
      <Button style={{ marginTop: 16 }} onPress={() => navigation.navigate('Posts')}>Posts</Button>

    </View>
  )
}

export default Home