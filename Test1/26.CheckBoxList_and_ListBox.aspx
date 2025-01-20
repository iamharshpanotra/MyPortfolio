<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="26.CheckBoxList_and_ListBox.aspx.cs" Inherits="Test1.CheckBoxList_and_ListBox" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <fieldset>
                <legend align="center">CheckBoxList and ListBox</legend>
                <asp:CheckBoxList ID="CheckBoxList1" runat="server" 
                    RepeatDirection="Horizontal" AutoPostBack="True" 
                    onselectedindexchanged="CheckBoxList1_SelectedIndexChanged">
                    <asp:ListItem Text="Diploma" Value="1"></asp:ListItem>
                    <asp:ListItem Text="Graduate" Value="2"></asp:ListItem>
                    <asp:ListItem Text="Post Graduate" Value="3"></asp:ListItem>
                    <asp:ListItem Text="Doctrate" Value="4"></asp:ListItem>
                </asp:CheckBoxList>
                <br />
                <asp:ListBox ID="ListBox1" runat="server" Height="78px" Width="127px">
                </asp:ListBox>
                <br /><br />
                <asp:Label ID="lblMessage" runat="server" Font-Bold="true"></asp:Label>
            </fieldset>
        </div>
    </form>
</body>
</html>
