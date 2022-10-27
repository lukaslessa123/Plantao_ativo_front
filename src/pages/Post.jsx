import { useNavigation, useRoute } from '@react-navigation/native'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import { Card, Text } from 'react-native-paper'
import { BASE_URL } from '../constants'

// #region Componentes externos
function Post() {
  const [post, setPost] = useState({})
  const route = useRoute()

  useEffect(() => {
    if (route.params.id) {
      axios.get(`${BASE_URL}/posts/${route.params.id}`)
        .then(({ data, status }) => status === 200 ? setPost(data) : setPost({}))
        .catch(err => setPost({}))
    }
  }, [route.params])

  return (
    <View style={{ flex: 1 }}>
      <Card style={{ margin: 8 }}>
        <Card.Title title={post.title} />
        <Card.Content>
          <Text>{post.body}</Text>
        </Card.Content>
      </Card>
    </View>
  )
}

function PostList() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    getPosts()
  }, [])

  function getPosts() {
    axios.get(`${BASE_URL}/posts`)
      .then(({ data, status }) => {
        if (status === 200) setPosts(data)
        else setPosts([])
      })
      .catch((err) => {
        setPosts([])
      })
  }

  return (
    <View style={{ flex: 1, padding: 8 }}>
      <FlatList
        data={posts}
        renderItem={({ item }) => <Detail data={item} />}
        keyExtractor={item => item.id} />
    </View>
  )
}

export { Post, PostList }

// #endregion

// #region Componentes internos

function Detail(props) {
  const { id, title, body } = props.data
  const navigation = useNavigation()

  return (
    <Card style={{ margin: 8 }}>
      <Card.Title title={title} />
      <Card.Content>
        <Text onPress={() => navigation.navigate('Post', { id: id })}>
          {body}
        </Text>
      </Card.Content>
    </Card>
  )
}

// #endregion
