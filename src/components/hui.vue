<template>
    <div>
          <headNav></headNav>
        <Breadcrumb>
            <BreadcrumbItem to="/">营销方式</BreadcrumbItem>
           
            <BreadcrumbItem>混合营销</BreadcrumbItem>
        </Breadcrumb>
        <h1>{{aboutMsg}}</h1>
        <ul>
            <li>方案1</li>
            <li>方案1</li>
            <li>方案1</li>
            <li>方案1</li>
        </ul>
    </div>
</template>
<script>
import headNav from "./headNav.vue";
export default {
  components: { headNav },
  data() {
    return {
      aboutMsg: "相匹配的营销方案",
      index: 1,
  
      
    };
  },
  methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            handleAdd () {
                this.index++;
                this.formDynamic.items.push({
                    value: '',
                    index: this.index,
                    status: 1
                });
            },
            handleRemove (index) {
                this.formDynamic.items[index].status = 0;
            }
        }
};
</script>
