'use strict'
import React,{Component} from 'react';
import {AppRegistry,
	Modal,
	View,
	Text,
	Button,
  StyleSheet,
	TouchableOpacity,
	ListView,
  TextInput,
  ScrollView,
} from 'react-native';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import EvilIconsIcon from 'react-native-vector-icons/EvilIcons';
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';
import OcticonsIcon from 'react-native-vector-icons/Octicons';
import Ionicons from './js/Ionicons';
import Entypo from './js/Entypo';
import FontAwesome from './js/FontAwesome';
import Foundation from './js/Foundation';
import EvilIcons from './js/EvilIcons';
import MaterialIcons from './js/MaterialIcons';
import Octicons from './js/Octicons';
const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2,
    sectionHeaderHasChanged: (h1, h2) => h1 !== h2,
});

let handleData = (json,icon,iname)=>{
	let data = Object.keys(json);
	let arr = [];
	data.map((d,i)=> arr.push({name:d,icon:icon,iconName:iname}));
	return arr;
}
let firstData = handleData(Ionicons,IoniconsIcon,'Ionicons');
let secondData = handleData(Entypo,EntypoIcon,'Entypo');
let thirdData = handleData(FontAwesome,FontAwesomeIcon,'FontAwesome');
let fourthData = handleData(Foundation,FoundationIcon,'Foundation');
let fifthData = handleData(EvilIcons,EvilIconsIcon,'EvilIcons');
let sixthData = handleData(MaterialIcons,MaterialIconsIcon,'MaterialIcons');
let seventhData = handleData(Octicons,OcticonsIcon,'Octicons');
const dataArry = [firstData,secondData,thirdData,fourthData,fifthData,sixthData,seventhData];
const allData = firstData.concat(secondData).concat(thirdData).concat(fourthData).concat(fifthData).concat(sixthData).concat(seventhData);
let checkData = [];
const array = [
	{name:'Ionicons',data:ds.cloneWithRowsAndSections({
        firstData
    }),x:0,y:0},
    {name:'Entypo',data:ds.cloneWithRowsAndSections({
        secondData
    }),x:120,y:0},
    {name:'FontAwesome',data:ds.cloneWithRowsAndSections({
        thirdData
    }),x:240,y:0},
    {name:'Foundation',data:ds.cloneWithRowsAndSections({
        fourthData
    }),x:0,y:70},
    {name:'EvilIcons',data:ds.cloneWithRowsAndSections({
        fifthData
    }),x:120,y:70},
    {name:'MaterialIcons',data:ds.cloneWithRowsAndSections({
        sixthData
    }),x:240,y:70},
    {name:'Octicons',data:ds.cloneWithRowsAndSections({
        seventhData
    }),x:0,y:140},
];
export default class App extends Component{
	state = {
		openModal:null,
		text:null,
		checkArray:[],
	}
	_check(i){
		let arr = this.state.checkArray;
        checkData = [];
		if(!arr.includes(i)){
            arr.push(i);
		}else{
            arr.splice(arr.indexOf(i),1);
		}

		arr.map((d,i) =>{checkData = checkData.concat(dataArry[d])});
		this.setState({checkArray:arr});

	}
    _renderRow(row){
		let Component = row.icon;
        return <View style={styles.row}>
			<Component name = {row.name}
						  size = {35}
						  color = 'rgba(0,0,0,0.8)'
			/>
			<Text>{row.name}
			</Text>
		</View>
    }
    _renderResult(){
    	let arr = [];
    	let text = this.state.text;
    	let data = checkData.length === 0? allData:checkData;
    	if(text && text.length > 0)
    	data.map((d,i) =>{
    		if(d.name.includes(text))
    			arr.push(d);
		});
        return arr.map((d,i) =>{
            return( <View style = {styles.row}
						  key = {i}
				>
				<d.icon name = {d.name} size = {30}/>
				<View style = {{flexDirection:'row'}}><Text>{d.name.split(text)[0]}</Text>
					<Text style = {{color:'red'}}>{text}</Text>
					<Text>{d.name.split(text)[1]}</Text>
				</View>
				<Text style = {styles.title}>{d.iconName}</Text>


			</View>);
		});
	}
	render(){
		return(
			<View>
					<Text>点击按钮上的文字打开图标页面</Text>
					<View style= { styles.buttonView}>
						{
							array.map((d,i) => <View
								style = {styles.button}
								transform={[
                                               { translateX:d.x},
                                               { translateY:d.y},
                                            ]}
								key = {d.name}>
								<TouchableOpacity
									style = {{flex:3}}
									onPress = {()=> this.setState({openModal:d.name})}>
									<Text>{d.name}</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style = {styles.check}
									onPress = {()=> this._check(i)}
								><MaterialIconsIcon
										name = 'check-circle'
										size = {30}
										color = {this.state.checkArray.includes(i)?'yellow':'gray'}
									/>
								</TouchableOpacity>
							</View>)
						}
					</View>
				{
					array.map((d,i) => <Modal key = {d.name}
						onRequestClose =  {()=> this.setState({openModal:null})}
						animationType='fade'
						visible={this.state.openModal === d.name}>
						<Button
							title = 'close'
							onPress = {()=> this.setState({openModal:null})}
							color = '#21890e'
						/>
						<Text style = {styles.title}>这是{d.name}的字体图标</Text>
						<ListView
							Icon = {d.Icon}
							dataSource={d.data}
							renderRow={this._renderRow.bind(this)}
						>
						</ListView>
					</Modal>)
				}
				<TextInput
					onChange={(e) => this.setState({text:e.nativeEvent.text})}
					value = {this.state.text}
				></TextInput>
				<ScrollView >
					<Text>显示在选中的图表中的查询结果</Text>
					{
						this._renderResult()
					}
				</ScrollView>
			</View>
		);
	}
}
const styles = StyleSheet.create({
    buttonView:{
		height:190,
	},
	check:{
    right:-35,
		zIndex:2,
	},
	button:{
    position:'absolute',
    width:100,
		height:50,
    backgroundColor:'rgba(100,210,189,0.3)',
		borderRadius:5,
    alignItems:'center',
	},
	title:{
		fontWeight:'bold',
		color:'rgba(0,100,0,0.9)',
	},
	row:{
    flexDirection:'row',
		justifyContent:'space-between',
		borderColor:'rgba(9,100,32,0.4)',
		borderBottomWidth:1,
   },
});
  