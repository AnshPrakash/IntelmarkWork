import React from 'react';
import { Linking,Swiper,TouchableOpacity,StatusBar,ScrollView,StyleSheet,Button,Text, View,Image } from 'react-native';
import { Dimensions } from 'react-native'
// import Dimensions from 'Dimensions'


const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} />
  </View>
);
const EditProfile = () => (
	console.log("Button pressed")
);

export default class App extends React.Component {
		callFun = () =>
		  {
		    alert("Image Clicked!!!");
		  }
		constructor(props) {
		super(props);
		this.state = {
				isLoading: true,
				image_array : [],
				text: '',
				totalLikes:0,
				totalComments:0,
				user_name : 'Jai',
				userId : 25580,
				website:'',
				recent_images:[],
				img_src: "https://scontent.cdninstagram.com/t51.2885-19/s150x150/25013819_206710969874270_6061400702469537792_n.jpg",
				follow_ratio_prop : 0.0,
				follow_arr:[],
				bios:"",
				access_token : '8593252.c09ec1a.83deea9350bf4bb39f82c5937c86e56b',
				posts:0

			}
		}
		componentDidMount() {
			var arr = []
			var ansh = []
			var foo=[]
			var likes=0
			var comments=0
			var images=[]
			// Dimensions.get('window').height;
			
		    //175257016-sankalra 1686110577-premsai 1807199-fb

		    return fetch('https://api.instagram.com/v1/users/'+this.state.userId+'/media/recent/?access_token='+this.state.access_token)
		    .then((response) => response.json())
			.then((response) => {
				for(var i=0;i<response.data.length;i++){
					arr.push(response.data[i]); 
					likes+=response.data[i].likes.count;
					comments=comments+response.data[i].comments.count;
					images.push(response.data[i].images.low_resolution.url);
					// console.log(images[i]);
				}
				this.setState({
					isLoading: false,
					image_array : arr,
					totalComments:comments,
					totalLikes:likes,
					recent_images:images,
					// caption:response.data[0].caption.text
				}, () => {
			          // do something with new state
			      });
			})
			.then(fetch('https://api.instagram.com/v1/users/'+this.state.userId+'/?access_token='+this.state.access_token)
				.then((response)=>response.json())
				.then((response)=>{
					foo.push(response.data.counts.followed_by)
					foo.push(response.data.counts.follows)
					this.setState({
						follow_ratio_prop : (response.data.counts.followed_by/response.data.counts.follows),
						img_src:response.data.profile_picture,
						follow_arr:foo,
						posts:response.data.counts.media,
						bios:response.data.bio,
						website:response.data.website,
						
					});
				}))
			.catch((error) => {
				console.error(error);
			});
		}

	  render() {
	  	var widthc=10
	  	var heighti=10
	    return (
	    	<View style={{paddingTop:20}}>
	    		 <MyStatusBar backgroundColor="#d44577" barStyle="light-content" />
			    <ScrollView>
			      <View style={styles.container}>
			       <View onLayout={(event) => {
							var {x, y, width, height} = event.nativeEvent.layout;
							heighti=height;
						}}>
				       <Image
				          style={{width: 100, height: 100, borderRadius: 70}}
				          source={{uri: this.state.img_src}}
				        />
			        </View>
			        <View style={{flex: 1,justifyContent:'center',alignItems: 'center',flexDirection:'column'}}
			        	onLayout={(event) => {
							  var {x, y, width, height} = event.nativeEvent.layout;
							  widthc=width;
							}}>
				        <View style={{flex: 1,justifyContent:'center',alignItems: 'center',flexDirection:'row'}}>
					        <View style={{marginRight: 20}}>
					        	<Text style={{textAlign: 'center',backgroundColor:'#cde1e1',fontFamily: 'Roboto',fontSize:15}}>
					        		<Text style={{textAlign: 'center',fontWeight:'bold'}}>{this.state.follow_arr[0]}{"\n"}</Text>
					        		<Text style={{textAlign: 'center',color:'#334141',fontFamily: 'Roboto'}}>followers</Text>
					        	</Text>
					        </View>
					        <View style={{marginRight: 20}}>
					        	<Text style={{textAlign: 'center',backgroundColor:'#cde1e1',fontSize:15}}>
					        		<Text style={{textAlign: 'center',fontWeight:'bold'}}>{this.state.follow_arr[1]}{"\n"}</Text>
					        		<Text style={{textAlign: 'center',color:'#334141'}}>following</Text>
					        	</Text>
					        </View>
					        <View>
					        	<Text style={{textAlign: 'center',backgroundColor:'#cde1e1',fontSize:15}}>
					        		<Text style={{textAlign: 'center',fontWeight:'bold'}}>{this.state.posts}{"\n"}</Text>
					        		<Text style={{textAlign: 'center',color:'#334141'}}>posts</Text>
					        	</Text>
					      	</View>
				      	</View>
				      	<View style={{}}>
					      	<TouchableOpacity  onPress={EditProfile} style={{ backgroundColor:'#d1c659',borderRadius: 70}}>
							    <Text style={{fontWeight:'bold'}}>Edit Button</Text>
							</TouchableOpacity>
						</View>
			      	</View>
			      </View>
					<Text style={{backgroundColor:'#ebf3f3'}}> <Text style={{fontWeight:'bold',color:'#bf4098',backgroundColor:'#ebf3f3'}}>Bio:</Text> {this.state.bios}</Text>
					<Text style={{color: 'blue',backgroundColor:'#ebf3f3'}}
					      onPress={() => Linking.openURL(this.state.website)}>
					  Website:{this.state.website}
					</Text>
					<View style={{borderBottomColor: 'black',borderBottomWidth: 1,flex: 1, flexDirection: 'row',backgroundColor: 'black'}}>
				        <View style={{width: Dimensions.get('window').width/2,  backgroundColor: 'powderblue'}} >
				        	<Text style={{fontWeight:'bold'}}>
				        		Likes Received:{this.state.totalLikes} {"\n"}
				        		Comments Received:{this.state.totalComments}
				        	</Text>
				        </View>
				        <View style={{width: Dimensions.get('window').width/2, backgroundColor: 'skyblue'}} />
				    </View>
				    <View style={{backgroundColor:'orange'}}>
				    	<Text style={{fontWeight:'bold',color:'blue',justifyContent:'center',textAlign: 'center'}}>Recent Photos</Text>
				    	<View style={{
				    		flex:1,
				    		flexDirection:'row',
				    		flexWrap:'wrap',
				    		flexGrow: 1,
				    		justifyContent: 'space-between',
				    		width:Dimensions.get('window').width,
				    		backgroundColor:'white',
				    	}}>
				    	<TouchableOpacity activeOpacity = { .5 } onPress={ this.callFun }>
					    	<Image
					          style={{width: Dimensions.get('window').width/2, height: Dimensions.get('window').width/2, borderRadius: 70}}
					          source={{uri: this.state.recent_images[0]}}
					        />
				        </TouchableOpacity>
				        <Image
				          style={{width: Dimensions.get('window').width/2, height: Dimensions.get('window').width/2, borderRadius: 70}}
				          source={{uri: this.state.recent_images[1]}}
				        />
				        <Image
				          style={{width: Dimensions.get('window').width/2, height: Dimensions.get('window').width/2, borderRadius: 70}}
				          source={{uri: this.state.recent_images[2]}}
				        />
				        <Image
				          style={{width: Dimensions.get('window').width/2, height: Dimensions.get('window').width/2, borderRadius: 70}}
				          source={{uri: this.state.recent_images[3]}}
				        />
				        <Image
				          style={{width: Dimensions.get('window').width/2, height: Dimensions.get('window').width/2, borderRadius: 70}}
				          source={{uri: this.state.recent_images[4]}}
				        />
				        <Image
				          style={{width: Dimensions.get('window').width/2, height: Dimensions.get('window').width/2, borderRadius: 70}}
				          source={{uri: this.state.recent_images[5]}}
				        />
				        <Image
				          style={{width: Dimensions.get('window').width/2, height: Dimensions.get('window').width/2, borderRadius: 70}}
				          source={{uri: this.state.recent_images[6]}}
				        />
				        <Image
				          style={{width: Dimensions.get('window').width/2, height: Dimensions.get('window').width/2, borderRadius: 70}}
				          source={{uri: this.state.recent_images[7]}}
				        />
				        <Image
				          style={{width: Dimensions.get('window').width/2, height: Dimensions.get('window').width/2, borderRadius: 70}}
				          source={{uri: this.state.recent_images[8]}}
				        />
				        <Image
				          style={{width: Dimensions.get('window').width/2, height: Dimensions.get('window').width/2, borderRadius: 70}}
				          source={{uri: this.state.recent_images[9]}}
				        />
				        <Image
				          style={{width: Dimensions.get('window').width/2, height: Dimensions.get('window').width/2, borderRadius: 70}}
				          source={{uri: this.state.recent_images[10]}}
				        />
				        <Image
				          style={{width: Dimensions.get('window').width/2, height: Dimensions.get('window').width/2, borderRadius: 70}}
				          source={{uri: this.state.recent_images[11]}}
				        />
				        <Image
				          style={{width: Dimensions.get('window').width/2, height: Dimensions.get('window').width/2, borderRadius: 70}}
				          source={{uri: this.state.recent_images[12]}}
				        />
				        <Image
				          style={{width: Dimensions.get('window').width/2, height: Dimensions.get('window').width/2, borderRadius: 70}}
				          source={{uri: this.state.recent_images[13]}}
				        />
				        <Image
				          style={{width: Dimensions.get('window').width/2, height: Dimensions.get('window').width/2, borderRadius: 70}}
				          source={{uri: this.state.recent_images[14]}}
				        />
				        <Image
				          style={{width: Dimensions.get('window').width/2, height: Dimensions.get('window').width/2, borderRadius: 70}}
				          source={{uri: this.state.recent_images[15]}}
				        />
				        <Image
				          style={{width: Dimensions.get('window').width/2, height: Dimensions.get('window').width/2, borderRadius: 70}}
				          source={{uri: this.state.recent_images[16]}}
				        />
				        <Image
				          style={{width:Dimensions.get('window').width/2, height: Dimensions.get('window').width/2, borderRadius: 70}}
				          source={{uri: this.state.recent_images[17]}}
				        />
				        <Image
				          style={{width: Dimensions.get('window').width/2, height: Dimensions.get('window').width/2, borderRadius: 70}}
				          source={{uri: this.state.recent_images[18]}}
				        />
				        <Image
				          style={{width: Dimensions.get('window').width/2, height: Dimensions.get('window').width/2, borderRadius: 70}}
				          source={{uri: this.state.recent_images[19]}}
				        />
				    	</View>
				    </View>
			    </ScrollView>
		    </View>
	    );
	  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebf3f3',
    alignItems: 'center',
    paddingTop:0,
    width:Dimensions.get('window').width,
    flexDirection: 'row',
    // justifyContent: 'center',
  },
  statusBar: {
    height: 40,
    borderRadius: 10,
  },
  appBar: {
    backgroundColor:'#79B45D',
    height: 44,
  },
  content: {
    flex: 1,
    backgroundColor: '#33373B',
  },
});

