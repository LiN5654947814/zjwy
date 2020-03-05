import { shallowMount } from '@vue/test-utils'
import axios from 'axios'

describe('检查增加业主方法', () => {
  it('不输入业主信息，返回错误码401，返回提示"请输入相应的业主信息"', () => {
    let owner = {
      ownerCard: '',
      ownerPhone: '',
      ownerName: '',
      ownerSex: '',
      ownerEmail: '',
      ownerMoveDate: '',
      author: '',
      originalPassword: ''
    }
    let test = new Promise((resolve, reject) => {
      // 测试套件中引入axios库，引用axios对接口发起请求
      axios
        .post('http://localhost:3000/addOwner', {
          params: {
            owner: owner
          }
        })
        .then(res => {
          resolve(res)
        })
    })
    return test.then(res => {
      expect(res.data.state).toBe(401)
      expect(res.data.message).toBe('请输入相应的业主信息')
    })
  })

  it('处了业主姓名不输入，其他信息输入，返回错误码401，返回提示"业主姓名不能为空"', () => {
    let owner = {
      ownerCard: '110101199003076691',
      ownerPhone: '13224557487',
      ownerName: '',
      ownerSex: '男',
      ownerEmail: '4396@qq.com',
      ownerMoveDate: '',
      author: 'false',
      originalPassword: '123456'
    }
    let test = new Promise((resolve, reject) => {
      axios
        .post('http://localhost:3000/addOwner', {
          params: {
            owner: owner
          }
        })
        .then(res => {
          resolve(res)
        })
    })
    return test.then(res => {
      expect(res.data.state).toBe(401)
      expect(res.data.message).toBe('业主姓名不能为空')
    })
  })

  it('输入一个新业主，验证通过，返回成功200，返回提示"添加成功"', () => {
    let owner = {
      ownerCard: '110101199003076691',
      ownerPhone: '13224557487',
      ownerName: '李青',
      ownerSex: '男',
      ownerEmail: '4396@qq.com',
      ownerMoveDate: '',
      author: 'false',
      originalPassword: '123456'
    }
    let test = new Promise((resolve, reject) => {
      axios
        .post('http://localhost:3000/addOwner', {
          params: {
            owner: owner
          }
        })
        .then(res => {
          resolve(res)
        })
    })
    return test.then(res => {
      expect(res.data.state).toBe(200)
      expect(res.data.message).toBe('添加成功')
    })
  })

  it('重复输入业主信息，验证错误返回错误401，返回提示"业主已存在"', () => {
    let owner = {
      ownerCard: '110101199003076691',
      ownerPhone: '13224557487',
      ownerName: '李青',
      ownerSex: '男',
      ownerEmail: '4396@qq.com',
      ownerMoveDate: '',
      author: 'false',
      originalPassword: '123456'
    }
    let test = new Promise((resolve, reject) => {
      axios
        .post('http://localhost:3000/addOwner', {
          params: {
            owner: owner
          }
        })
        .then(res => {
          resolve(res)
        })
    })
    return test.then(res => {
      expect(res.data.state).toBe(401)
      expect(res.data.message).toBe('业主已存在')
    })
  })

  it('处了邮箱重复，其他输入新的业主信息，验证错误返回错误401，返回提示"邮箱重复，已存在"', () => {
    let owner = {
      ownerCard: '110101199003073917',
      ownerPhone: '13112995498',
      ownerName: '清理',
      ownerSex: '男',
      ownerEmail: '4396@qq.com',
      ownerMoveDate: '',
      author: 'false',
      originalPassword: '123456'
    }
    let test = new Promise((resolve, reject) => {
      axios
        .post('http://localhost:3000/addOwner', {
          params: {
            owner: owner
          }
        })
        .then(res => {
          resolve(res)
        })
    })
    return test.then(res => {
      expect(res.data.state).toBe(401)
      expect(res.data.message).toBe('邮箱重复，已存在')
    })
  })

  it('处了手机号重复，其他输入新的业主信息，验证错误返回错误401，返回提示"手机号重复,已存在"', () => {
    let owner = {
      ownerCard: '110101199003071111',
      ownerPhone: '13224557487',
      ownerName: '李青',
      ownerSex: '男',
      ownerEmail: '6934@qq.com',
      ownerMoveDate: '',
      author: 'false',
      originalPassword: '123456'
    }
    let test = new Promise((resolve, reject) => {
      axios
        .post('http://localhost:3000/addOwner', {
          params: {
            owner: owner
          }
        })
        .then(res => {
          resolve(res)
        })
    })
    return test.then(res => {
      expect(res.data.state).toBe(401)
      expect(res.data.message).toBe('手机号重复,已存在')
    })
  })

  it('密码带有空格，其他输入新的业主信息，验证错误返回错误401，返回提示"密码不能有空格"', () => {
    let owner = {
      ownerCard: '110101199003071111',
      ownerPhone: '13224557482',
      ownerName: '李青',
      ownerSex: '男',
      ownerEmail: '6934@qq.com',
      ownerMoveDate: '',
      author: 'false',
      originalPassword: '12 346'
    }
    let test = new Promise((resolve, reject) => {
      axios
        .post('http://localhost:3000/addOwner', {
          params: {
            owner: owner
          }
        })
        .then(res => {
          resolve(res)
        })
    })
    return test.then(res => {
      expect(res.data.state).toBe(401)
      expect(res.data.message).toBe('密码不能有空格')
    })
  })
  it('密码输入超过六位数，其他输入新的业主信息，验证错误返回错误401，返回提示"请设置6位数的密码"', () => {
    let owner = {
      ownerCard: '110101199003071133',
      ownerPhone: '13224557481',
      ownerName: '李青',
      ownerSex: '男',
      ownerEmail: '6934@qq.com',
      ownerMoveDate: '',
      author: 'false',
      originalPassword: '1234567'
    }
    let test = new Promise((resolve, reject) => {
      axios
        .post('http://localhost:3000/addOwner', {
          params: {
            owner: owner
          }
        })
        .then(res => {
          resolve(res)
        })
    })
    return test.then(res => {
      expect(res.data.state).toBe(401)
      expect(res.data.message).toBe('请设置6位数的密码')
    })
  })

  it('身份证输入错误，验证错误返回错误401，返回提示"请输入正确的身份证号码"', () => {
    let owner = {
      ownerCard: '123',
      ownerPhone: '13224557481',
      ownerName: '李青',
      ownerSex: '男',
      ownerEmail: 'cqcsa@qq.com',
      ownerMoveDate: '',
      author: 'false',
      originalPassword: '123467'
    }
    let test = new Promise((resolve, reject) => {
      axios
        .post('http://localhost:3000/addOwner', {
          params: {
            owner: owner
          }
        })
        .then(res => {
          resolve(res)
        })
    })
    return test.then(res => {
      expect(res.data.state).toBe(401)
      expect(res.data.message).toBe('请输入正确的身份证号码')
    })
  })

  it('手机号输入错误，验证错误返回错误401，返回提示"请输入正确的手机号"', () => {
    let owner = {
      ownerCard: '110101199003078590',
      ownerPhone: '132247481',
      ownerName: '李青',
      ownerSex: '男',
      ownerEmail: 'cqcsa@qq.com',
      ownerMoveDate: '',
      author: 'false',
      originalPassword: '123467'
    }
    let test = new Promise((resolve, reject) => {
      axios
        .post('http://localhost:3000/addOwner', {
          params: {
            owner: owner
          }
        })
        .then(res => {
          resolve(res)
        })
    })
    return test.then(res => {
      expect(res.data.state).toBe(401)
      expect(res.data.message).toBe('请输入正确的手机号')
    })
  })
})
