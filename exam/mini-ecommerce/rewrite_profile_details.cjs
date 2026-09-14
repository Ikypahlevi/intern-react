const fs = require('fs');
let c = fs.readFileSync('src/Pages/user/profile/_components/ProfileDetails.jsx', 'utf8');

c = c.replace(/const onSubmit = async \(data\) => \{[\s\S]*?login\(\{/, 'const updateUserMutation = useUpdateUser();\n  const onSubmit = async (data) => {\n    try {\n      setIsSubmitting(true);\n      const currentUser = await userService.getById(user.id);\n      if (!currentUser) {\n        toast.error("Không tìm thấy tài khoản để cập nhật!");\n        return;\n      }\n      const updatedUser = { ...currentUser, ...data };\n      await updateUserMutation.mutateAsync({ id: user.id, ...data });\n      toast.success("Cập nhật thông tin thành công! 🎉");\n      login({');

fs.writeFileSync('src/Pages/user/profile/_components/ProfileDetails.jsx', c);
