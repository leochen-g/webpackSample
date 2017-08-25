/**
 * Created by geng on 2017/8/25.
 */
//添加json配置文件
import config from './config.json'
//引入react
import React,{Component} from 'react'
//引入样式文件
import style from './Greeter.css'

class Greeter extends Component{
    render() {
        return (
            <div className={style.root}>
            {config.greetText}
            </div>
        )
    }
}
export default Greeter


