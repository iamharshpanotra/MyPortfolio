<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="21_RetrievingSelectedItemText,ValueAndIndex.aspx.cs" Inherits="Test1._21_Retrieving_selected_item_text__value_and_index" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <fieldset>
                <legend align="center">Retrieving Selected Item Text, Value and Index</legend>
                <asp:DropDownList ID="Continentlist" runat="server">
                    <asp:ListItem Text="Select Continent" Value="-1"></asp:ListItem>
                    <asp:ListItem Text="Asia" Value="1"></asp:ListItem>
                    <asp:ListItem Text="Africa" Value="2"></asp:ListItem>                    
                    <asp:ListItem Text="North America" Value="3"></asp:ListItem>
                    <asp:ListItem Text="South America" Value="4"></asp:ListItem>
                    <asp:ListItem Text="Europe" Value="5"></asp:ListItem>
                    <asp:ListItem Text="Australia" Value="6"></asp:ListItem>
                    <asp:ListItem Text="Antarctica" Value="7"></asp:ListItem>
                </asp:DropDownList>

                <br /><br />
                <asp:Button ID="Button1" runat="server" Text="Button" onclick="Button1_Click" />
            </fieldset>
        </div>
    </form>
</body>
</html>
