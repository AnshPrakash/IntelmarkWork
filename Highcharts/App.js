import React, { Component } from 'react';
import { ListView, Text, View,ScrollView,TextInput,StyleSheet, Button} from 'react-native';
import ChartView from 'react-native-highcharts';

export default class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			image_array : [],
			text: '',
			user_name : 'Facebook',
			userId : 25580,
			follow_ratio_prop : 0.0,
			follow_arr:[],
			access_token : '8593252.c09ec1a.83deea9350bf4bb39f82c5937c86e56b'

		}
	}

	componentDidMount() {
		var arr = []
		var ansh = []
		var foo=[]
	    //175257016-sankalra 1686110577-premsai 1807199-fb

	    return fetch('https://api.instagram.com/v1/users/'+this.state.userId+'/media/recent/?access_token='+this.state.access_token)
	    .then((response) => response.json())
		.then((response) => {
			for(i=0;i<response.data.length;i++){
				arr.push(response.data[i]); 
			}
			this.setState({
				isLoading: false,
				image_array : arr
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
					follow_arr:foo	
				});
			}))
		.catch((error) => {
			console.error(error);
		});
	}
render() {

	var num_likes = [];

	var a = 0;
	var foll=[];

	var num_comments = [];

	var days_posted = [["Sunday",0],["Monday",0],["Tuesday",0],["Wednesday",0],["Thursday",0],["Friday",0],["Saturday",0]];
	var hours_posted = [["00",0],["01",0],["02",0],["03",0],["04",0],["05",0],["06",0],["07",0],["08",0],["09",0],["10",0],["11",0],["12",0],["13",0],["14",0],["15",0],["16",0],["17",0],["18",0],["19",0],["20",0],["21",0],["22",0],["23",0]];

	var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
	foll=this.state.follow_arr;

	for(i=0;i<this.state.image_array.length;i++){
		num_likes.push(this.state.image_array[i].likes.count);
		num_comments.push(this.state.image_array[i].comments.count);
		a = new Date((this.state.image_array[i].created_time*1000));
		days_posted[a.getDay()][1] = days_posted[a.getDay()][1]+1;
		hours_posted[a.getHours()][1] = hours_posted[a.getHours()][1]+1; 
	}

	var likes_chart={
		chart: {
			type: 'spline',
			backgroundColor: '#FCFFC5',
			marginRight: 10
		},
		title: {
			text: 'Likes'
		},
		xAxis: {
			type: 'x'
		},
		yAxis: {
			title: {
				text: 'Number'
			},
			plotLines: [{
				value: 0,
				width: 1,
				color: '#808080'
			}]
		},
		colors:['#008B8B'],
		series: [{
			data : num_likes,
			showInLegend: false

		}]
	};
	var comments_chart={
		chart: {
			type: 'spline',
			marginRight: 10,
		},
		title: {
			text: 'Comments'
		},
		xAxis: {
			type: 'x'
		},
		yAxis: {
			title: {
				text: 'Number'
			},
			plotLines: [{
				value: 0,
				width: 1,
				color: '#808080'
			}]
		},
		colors:['#A52A2A'],
		series: [{
			data : num_comments,
			showInLegend: false

		}]
	};

	var days_posted_pie = {
		title: {
			text: 'Days of posting'
		},
		chart :{
			type:'pie',
			backgroundColor: '#FFD1FF',
		},
		xAxis: {
			categories: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
		},
		colors:['#FFB2D1','#FF1A75','#FF267D','#FF3385','#FF4C94','#FF73AB','#FF99C2'],
		series: [{
			type : 'pie',
			data: days_posted,
			showInLegend: false
		}]
	};
	var hours_posted_pie = {
		title: {
			text: 'Hours posted'
		},
		colors: ['pink'],
		series: [{
			type : 'bar',
			data: hours_posted,
			showInLegend: false
		}]
	};
	var Donut={
		title:{
			text:'Follow Ratio',
		},
		chart :{
			type:'pie',
			backgroundColor: '#FFC7AB',
		},
		xAxis: {
			categories: ['followers','following']
		},
	 	colors:['Tomato','DodgerBlue'],
		series:[{
			type: 'pie',
			data: foll,
			showInLegend:false
		}]
	}
	
	const spline_chart_looks = {
		global: {
			useUTC: false
		},
		lang: {
			decimalPoint: '.',
			thousandsSep: ','
		}
	};
	const gradient_inducers = {
		global: {
			useUTC: false
		},
		lang: {
			decimalPoint: '.',
			thousandsSep: ','
		},
		radialGradient: {
			cx: 0.5,
			cy: 0.3,
			r: 0.7
		}

	}
	// const Donut_Follows={

	// }

	return (
		<View style={styles.container}  key={this.state.key}>
		<Text style = {styles.Text}>{this.state.user_name}</Text>
		<Text style = {{textAlign : 'center', color: '#001F6B',fontWeight:'bold'}}>Follow Ratio : {this.state.follow_ratio_prop}</Text>
		<ScrollView>
		<TextInput style={{height: 40}}	placeholder="Query?" onChangeText={
			(text_1) => {
				fetch('https://www.instagram.com/{text_1}/?__a=1')
					.then(console.log("this--------------------------"))
					.then((response)=>response.json())
					.then((response)=>{
						this.setState({
							isLoading:true,
							userId : response.user.id,
							user_name : text_1
						})
					})
					.catch((error) => {
						console.error(error);
					});
		}
	}/>
		<Button style ={{width:100}} color="#F76166" title = 'Refresh' onPress = {()=> this.componentDidMount()}/>
		<ChartView style={{height:300}} config={likes_chart} options={spline_chart_looks}></ChartView>
		<ChartView style={{height:300}} config={comments_chart} spline_chart_looks={spline_chart_looks}></ChartView>
		<ChartView style={{height:300}} config={days_posted_pie} options={gradient_inducers}></ChartView>
		<ChartView style={{height:300}} config={hours_posted_pie} options={gradient_inducers}></ChartView>
		<ChartView style={{height:300}} config={Donut} options={gradient_inducers}></ChartView>
		</ScrollView>
		</View>

		);
	}
}

const styles = StyleSheet.create(
{
     container:
     {
         flex: 1,
         paddingTop: 50,
         backgroundColor: '#996666' 
     },
     Button:
     {
     	width:100,
     	backgroundColor:'#BA0066'
     },
     Text:
  	 {
  	 	textAlign:'center',
  	 	fontSize:20,
  	 	color:'#002999',
  	 	fontWeight:'bold'
  	 }
});