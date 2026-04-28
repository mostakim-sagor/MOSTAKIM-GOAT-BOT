const moment = require("moment-timezone");

module.exports = {
	config: {
		name: "memberLeave",
		version: "2.1",
		author: "MOSTAKIM",
		category: "events"
	},

	langs: {
		en: {
			leaveType1: "left",
			leaveType2: "was kicked from",
			defaultLeaveMessage: `
╭━━━〔 🚪 MEMBER LEFT 〕━━━╮
┃ 👤 Name : {userNameTag}
┃ 🆔 UID : {uid}
┃ 📝 Type : {type}
┃ 🕒 Time : {time}
┃ 📊 Group Members : {count}
╰━━━━━━━━━━━━━━━━━━╯

{userNameTag} {type} The Group
			`
		}
	},

	onEvent: async ({ event, api, message, usersData, threadsData, getLang }) => {
		try {
			// only leave/kick event
			if (event.logMessageType !== "log:unsubscribe") return;

			const { threadID, logMessageData, author } = event;

			const leftID = logMessageData?.leftParticipantFbId;
			if (!leftID) return;

			// bot skip
			if (leftID == api.getCurrentUserID()) return;

			const time = moment()
				.tz("Asia/Dhaka")
				.format("DD-MM-YYYY | hh:mm A");

			const userName = await usersData.getName(leftID);

			// thread info safe check
			let threadInfo = await api.getThreadInfo(threadID).catch(() => null);
			let count = threadInfo?.participantIDs?.length || "Unknown";

			let leaveMessage =
				threadInfo?.data?.leaveMessage ||
				getLang("defaultLeaveMessage");

			// replace system
			leaveMessage = leaveMessage
				.replace(/\{userName\}|\{userNameTag\}/g, userName || "User")
				.replace(/\{uid\}/g, leftID)
				.replace(
					/\{type\}/g,
					leftID == author
						? getLang("leaveType1")
						: getLang("leaveType2")
				)
				.replace(/\{time\}/g, time)
				.replace(/\{count\}/g, count);

			const needMention = leaveMessage.includes("{userNameTag}");

			return message.send({
				body: leaveMessage,
				mentions: needMention
					? [
							{
								id: leftID,
								tag: userName || "User"
							}
					  ]
					: []
			});
		} catch (err) {
			console.log("Leave event error:", err);
		}
	}
};