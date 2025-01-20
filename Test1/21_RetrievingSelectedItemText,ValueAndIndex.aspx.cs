using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Test1
{
    public partial class _21_Retrieving_selected_item_text__value_and_index : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                Continentlist.SelectedValue = "-1";
            }
        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            if (Continentlist.SelectedValue != "-1")
            {
                Response.Write("Selected Item Text = " + Continentlist.SelectedItem.Text + "<br/>");
                Response.Write("Selected Item Value = " + Continentlist.SelectedItem.Value + "<br/>");
                Response.Write("Selected Item Index = " + Continentlist.SelectedIndex.ToString());
            }
            else
            {
                Response.Write("Please select the continent");
            }
        }
    }
}