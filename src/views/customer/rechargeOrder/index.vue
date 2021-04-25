<template>
  <div>
       <!--时间格式化-->
      <!--重复点击会报错-->

    <h2>Recharge Order List</h2>
    <!-- header -->
    <el-card class="header">
      <div class="item0">
        <div class="item">
          <p style="width: 80px">Order ID</p>
          <p style="width: 20px">:</p>
          <el-input
            placeholder="Please enter OrderId"
            v-model="OrderId"
            clearable
            style="width: 200px"
          ></el-input>
        </div>
        <div class="item">
          <p style="width: 80px">Email</p>
          <p style="width: 20px">:</p>
          <el-input
            placeholder="Please enter Email"
            v-model="Email"
            clearable
            style="width: 200px"
          ></el-input>
        </div>
        <div class="item">
          <p style="width: 80px">Status</p>
          <p style="width: 20px">:</p>
          <el-select
            v-model="Status"
            clearable
            placeholder="Please select the status"
            style="width: 200px"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            >
            </el-option>
          </el-select>
        </div>
        <div class="item">
          <p style="width: 80px">Date</p>
          <p style="width: 20px">:</p>
          <div class="block">
            <el-date-picker
              v-model="date"
              type="daterange"
              range-separator="to"
              start-placeholder="Start"
              end-placeholder="End"
              style="width: 260px"
              format="yyyy/MM/dd "
              value-format="yyyy-MM-dd"
            >
              >
            </el-date-picker>
          </div>
        </div>
      </div>
      <div class="item01">
        <div>
          <el-button type="primary" style="width: 100px" @click="confirm()"
            >Confirm</el-button
          >
          <el-button style="width: 100px" @click="cancel()">Cancel</el-button>
        </div>
      </div>
    </el-card>
    <!-- table -->
    <el-table  v-loading="listLoading" :data="datalist" height="400" border style="width: 100%">
      <el-table-column
        prop="appCode"
        label="Platform"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="createDate"
        label="Transaction Time"
        width="200"
        align="center"
        class="TransactionTime"
      >
      </el-table-column>
      <el-table-column
        prop="TransactionID"
        label="Transaction ID"
        width="130"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="paySerialNumber"
        label="Order ID"
        width="163"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="channelAccountName"
        label="Payment Gateway"
        width="180"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="amount"
        label="Transaction Amount"
        width="105"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="payStatusStr"
        label="Transaction Status"
        width="110"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="orderStatus"
        label="Order Status"
        width="70"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="paySystemMessage"
        label="Note"
        width="220"
        height="100"
        align="center"
      >
      </el-table-column>
    </el-table>
    <!-- paging -->
    <div class="block" style="float: right">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="this.pageNum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="this.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template> 

<script>
import axios from "axios";
export default {
  name: "index",
  data() {
    return {
      OrderId: "",
      Email: "",
      Status: "",
      date: "",
      options: [
        {
          value: "选项1",
          label: "1",
        },
        {
          value: "选项2",
          label: "2",
        },
        {
          value: "选项3",
          label: "3",
        },
        {
          value: "选项4",
          label: "4",
        },
      ],
        listLoading: false,
      datalist: [],
      pageNum: 1, // 当前是第几页
      pageSize: 20, // 每页显示多少条数据
      total: 0, // 分类的总条数
    };
  },
  created() {
  },
  mounted() {
    let token=window.sessionStorage.getItem("token");
      //因为进入到这个页面已经授权，并且拿到后端的jwt作为token
    if(token){   //有token才会获取后端数据
      this.getList();
    }
  },
  watch: {},
  methods: {
    getList() {
        this.listLoading=true;
      axios.defaults.headers.post["Content-Type"] =
        "application/x-www-form-urlencoded;charset=UTF-8";
      axios
          .get(
              "http://payadmin.indiafreeloan.in/rest/order/list",
              {
                  params:{
                      'currentPage':this.pageNum,
                      'pageSize':this.pageSize
                  },
                  headers: { Authorization: window.sessionStorage.getItem("token") },
              }
          )
        .then((res) => {
            this.listLoading = false;
          this.datalist = res.data.data.result;
          this.total=res.data.data.totalCount;
        })
        .catch((err) => {console.log(err)});
    },
       //点击查询
    confirm() {
        this.listLoading=true;
      let beginDateStr = this.date[0];
      let endDateStr = this.date[1];
      axios.defaults.headers.post["Content-Type"] =
        "application/x-www-form-urlencoded;charset=UTF-8";
      axios
        .get("http://payadmin.indiafreeloan.in/rest/order/list", {
          params: {
            paySerialNumber: this.OrderId,
            orderStatus: this.Status,
            email: this.Email,
            beginDateStr: beginDateStr,
            endDateStr: endDateStr,
          },
          headers: { Authorization: window.sessionStorage.getItem("token") },
        })
        .then((res) => {
            this.listLoading = false;
          this.datalist = res.data.data.result;
            this.total=res.data.data.totalCount;
          console.log(res.data.data);
        })
        .catch((err) => {console.log(err)});
      // 思考搜索完之后要不要清空搜索数据
    },
      //点击取消按钮  清空搜索的数据
    cancel() {
      this.OrderId = "";
      this.Email = "";
      this.Status = "";
      this.date = "";
      this.getList();
    },
    // resetParentId(){
    //     this.pageNum = 1;
    //     if(this.$route.query.parentId !== undefined){
    //         this.parentId = this.$route.query.parentId
    //     }else{
    //         this.parentId = 0;
    //     }
    // },
    // getList() {
    //   // ajax获取分类数据
    //   // this.listLoading = true;  // 在发ajax请求之前，先把loading变成true
    //   // getCategory(this.parentId,this.pageNum,this.pageSize).then(response=>{
    //   //     console.log(response)
    //   //     if(response.status === 1){
    //   //         this.listLoading = false;
    //   //         this.listData = response.data.category_list;
    //   //         this.total = response.data.category_count;
    //   //     }
    //   // })
    //   console.log(123);
    // },
      //一页显示多少条
    handleSizeChange(val) {
        this.pageNum=1;
        this.pageSize=val;
        this.getList();//重新加载数据
    },
    handleCurrentChange(val) {
        this.pageNum=val;
        this.getList();//  重新加载数据
    },
  },
  filters: {},
};
</script>

<style scoped lang="less">
.header {
  width: 1230px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  margin-bottom: 20px;
}
.item0 {
  width: 800px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.item01 {
  width: 240px;
  height: 100px;
  float: right;
  position: absolute;
  top: 20px;
  right: 100px;
}
.item {
  display: flex;
  width: 360px;
}
</style>






