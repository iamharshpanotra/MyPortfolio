using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Test1
{
    public partial class ListBox_control : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        protected void Button1_Click(object sender, EventArgs e)
        {
            foreach (ListItem li in ListBox1.Items)
            {
                if (li.Selected)
                {
                    Response.Write("Text = " + li.Text + ", ");
                    Response.Write("Value = " + li.Value + ", ");
                    Response.Write("Index = " + ListBox1.Items.IndexOf(li).ToString());
                    Response.Write("<br/>");
                }
            }
        }
    }
}