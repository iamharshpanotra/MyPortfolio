using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Test1
{
    public partial class CheckBoxList_and_ListBox : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void CheckBoxList1_SelectedIndexChanged(object sender, EventArgs e)
        {
            // Everytime the selection changes, clear the items in the listbox
            ListBox1.Items.Clear();
            // Loop thru each litemitem in the checkboxlist
            foreach (ListItem li in CheckBoxList1.Items)
            {
                // If the listitem is selected
                if (li.Selected)
                {
                    // Add the listitem text to the listbox
                    ListBox1.Items.Add(li.Text);

                    // Add the lisitem as an object. This ensures the listitem is 
                    // selected in the listbox. For this to work, listbox, 
                    // SelectionMode must be set to Multiple. The SelectionMode
                    // Property can be set in the HTML source also.
                    // ListBox1.SelectionMode = ListSelectionMode.Multiple
                    // ListBox1.Items.Add(li);
                }
            }
            // If nothing is selected from the checkboxlist
            if (CheckBoxList1.SelectedIndex == -1)
            {
                // Set the label ForeColor to Red
                lblMessage.ForeColor = System.Drawing.Color.Red;
            }
            // If atleast one listitem is selected
            else
            {
                // Set the label forecolor to black
                lblMessage.ForeColor = System.Drawing.Color.Black;
            }
            // Display the total number of items selected from the checkboxlist
            lblMessage.Text = ListBox1.Items.Count.ToString() + " item(s) selected";
        }
    }
}