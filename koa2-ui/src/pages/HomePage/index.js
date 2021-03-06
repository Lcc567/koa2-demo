
import React from 'react'
import { Layout, Menu, Avatar } from 'antd';
import { Switch, Route } from 'react-router-dom'
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import './index.less'
import Posts from '../Posts'
import PostList from '../Posts/PostList'
import PostItem from '../Posts/PostItem'
import MyPost from '../Posts/MyPost'

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

class HomePage extends React.Component {
    state = {
        collapsed: false,
        userInfo: {}
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    handleSelect = ({ key }) => {
        console.log('this.props.history', process);
        this.props.history.push(key)
    }

    componentDidMount() {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'))
        this.setState({
            userInfo
        })
    }

    render() {
        return (
            <Layout className="homepage">
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" onClick={this.handleSelect}>
                        <SubMenu key="sub1" title="贴吧">
                            <Menu.Item key="/posts" icon={<UserOutlined />}>
                                发帖
                            </Menu.Item>
                            <Menu.Item key="/posts/list" icon={<VideoCameraOutlined />}>
                                看帖
                            </Menu.Item>
                            <Menu.Item key="/posts/myPost" icon={<VideoCameraOutlined />}>
                                我的贴子
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }}>
                        {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            style: {
                                color: '#fff',
                                fontSize: '20px'
                            },
                            onClick: this.toggle,
                        })}

                        {React.createElement(LogoutOutlined, {
                            style: {
                                float: 'right',
                                marginTop: '20px',
                                marginRight: '16px',
                                color: '#fff',
                                fontSize: '20px'
                            },
                            onClick: () => {
                                localStorage.setItem('isLogin', 'false')
                                this.props.history.push('/login')
                            }
                        })}
                        <Avatar style={{
                            float: 'right',
                            marginTop: '16px',
                            marginRight: '16px',
                        }} src={`${process.env.REACT_APP_BASEURL}${this.state.userInfo.avatar}`} />
                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                        }}
                    >
                        <Switch>
                            <Route path='/posts/list' component={PostList} />
                            <Route path='/posts/myPost' component={MyPost} />
                            <Route path='/posts/:id' component={PostItem} />
                            <Route path='/posts' component={Posts} />
                        </Switch>
                    </Content>
                </Layout>
            </Layout >
        );
    }
}

export default HomePage
