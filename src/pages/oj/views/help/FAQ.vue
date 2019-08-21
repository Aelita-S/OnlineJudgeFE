<template>
  <panel>
    <div slot="title">{{$t('m.Frequently_Asked_Questions')}}</div>
    <div class="content markdown-body">
      <ul>
        <li>输入和输出的方式？
          <p>你的程序应该从 <code>stdin</code> (即 Standard Input) 中读取输入，并将输出写入 <code>stdout</code> (即 Standard Output).
            比如说，你可以在C语言中使用 <code>scanf</code> 和 <code>printf</code> 或者在C++中使用<code>cin</code> 和 <code>cout</code> 来读取 stdin 以及写入 stdout。
          </p>
        </li>
         </li>
        <li>提交试行时间是什么意思？
        <p>OJ 系统可能会多次用不同的样例来测试你的代码。如果你的代码在规定时间内对每一个样例都给出了正确答案，执行时间会显示耗时最长的样例。否则，执行时间不会显示
        </p>
        </li>
        <li>我要怎么使用 C++ Int64？
          <p>你应该声明为 <code>long long</code> 并且使用 <code>cin/cout</code> 或者 <code>%lld</code>， 使用<code> __int64</code> 会导致 <code>编译错误 (即 Compile Error/CE)</code>.</p>
        </li>
        <li>Java 主要注意的地方
          <p>所有程序都必须在一个静态的 <code>Main</code> 类中。 不要使用 public classes: <code>Main</code> 必须是非public 来阻止 compile error。</p>
        </li>
        <li>关于表达错误 (Presentation error)？
          <p>本 OJ 系统中没有表达错误。判题程序会自动去除 <b>最后一行</b> 的换行符和空格。
            如果依旧和样例不符，则结果为 <code>答案错误 (即 Wrong Answer/WA)</code>.</p>
        </li>
        <li>怎样反馈 OJ 的bug？
          <p>The onlinejudge is open source, you can open an issue in <a href="https://github.com/QingdaoU/OnlineJudge">Github</a>.
            The details(like env, version..) about a bug is required, which will help us a lot to solve the bug.
            Certainly, we are very pleased to merge your pull requests.
            <br>或者直接联系深大电协，管理员 Email：<span><b>2018132153@email.szu.edu.cn</b></span>
          </p>
        </li>
      </ul>
    </div>
  </panel>
</template>

<script>
</script>

<style lang="less" scoped>
  .content {
    font-size: 16px;
    margin: 0 50px 40px 50px;
    > ul {
      list-style: disc;
      li {
        font-size: 16px;
        margin-top: 20px;
        &:first-child {
          margin-top: 0;
        }
        p {
          font-size: 14px;
          margin-top: 5px;
        }
      }
    }
  }
</style>
