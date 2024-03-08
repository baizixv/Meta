axios({
  method: 'get',
  url: 'https://shcx.daoyoucloud.com/api/orders:get?filter=%7B%7D',
  headers: {
    accept: 'application/json',
    'X-App': 'sweet_sweet',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcwOTU0OTQ5MCwiZXhwIjoxNzEwMTU0MjkwfQ.Co2M2dxCpGO94rDKQWQ-S9lyki3L_BrFfxg0i4RMB3g',
  },
})
  .then(response => {
    console.log(response.data) // 打印响应数据
  })
  .catch(error => {
    console.error(error) // 打印错误信息
  })
