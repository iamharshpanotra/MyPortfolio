using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Test1
{
    public partial class Test1 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void buttonSelectAll_Click(object sender, EventArgs e)
        {
            foreach (ListItem li in CheckBoxList1.Items)
            {
                li.Selected = true;
            }
        }

        protected void buttonDeselectAll_Click(object sender, EventArgs e)
        {
            foreach (ListItem li in CheckBoxList1.Items)
            {
                li.Selected = false;
            }
        }
    }
}