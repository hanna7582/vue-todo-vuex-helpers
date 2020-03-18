<template>
    <div>
        <nav>
            <ul>
                <li>
                    <div class="menu">Theme</div>
                    <div class="menu-option">
                        <span>light</span>
                        <label>
                            <input type="checkbox" 
                                    v-model="themeChangeCheck" 
                                    @change="themeChange({themeChangeCheck})">
                            <span></span>
                        </label>
                        <span>dark</span>
                    </div>
                </li>
            </ul>        
        </nav>
        <div class="nav-bg" v-touch:swipe.right="navClose"></div>
    </div>    
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
    data() {
        return {
            themeChangeCheck:''
        }
    },
    computed: {
        ...mapState(['theme']),
        themeCheck:function(){
            return this.theme=='light'?false:true
        }
    },
    created() {
        this.themeChangeCheck=this.themeCheck;
    },
    methods: {        
        ...mapMutations(['themeChange']),
        navClose(){
            this.$emit('navClose');            
        }
    },
}
</script>

<style lang="scss" scoped>
.open .nav-bg{         
    z-index: 100;
    position: fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background: rgba(0, 0, 0, 0.1);    
}
nav{    
    z-index: 101;
    height: 100%;
    width: 200px;
    background-color: $primary;
    color:$white;
    transition: right 0.5s;    
    @include pos-fix(0, -200px);
    .open &{
       right:0;
       box-shadow: -8px 0px 20px 0px rgba(0, 0, 0, 0.18);
    }    
    ul{
        padding: 20px;
        .menu{
           margin-bottom:5px;
        }
        .menu-option{            
            label{
                display: inline-block;
                width: 60px;
                height: 20px;  
                margin:0 10px;
                border-radius: 12px;
                border:2px solid $white;     
                background-color:$light-gray;    
                vertical-align: middle;
                span{
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background-color: $dark-gray; 
                    transition: 0.5s;
                }
                input:checked + span{
                    margin-left:40px;
                }
            }
        }
    }

}
</style>