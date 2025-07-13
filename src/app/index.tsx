import { MaterialIcons } from "@expo/vector-icons";
import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Index() {
  const handleEmailPress = () => {
    const email = "lunlun83523@gmail.com";
    const subject = "精打細算 APP 建議與回饋";
    const url = `mailto:${email}?subject=${encodeURIComponent(subject)}`;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert("無法開啟郵件", "請手動複製郵件地址：" + email);
        }
      })
      .catch((err) => {
        console.error("郵件開啟錯誤:", err);
        Alert.alert("無法開啟郵件", "請手動複製郵件地址：" + email);
      });
  };

  return (
    <ScrollView
      style={styles.rootContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.titleContainer}>
            <MaterialIcons name="attach-money" size={36} color="#2E7D32" />
            <Text style={styles.appTitle}>精打細算</Text>
          </View>
          <Text style={styles.subtitle}>讓每一分錢都用在刀刃上</Text>
        </View>

        {/* 主要介紹卡片 */}
        <View style={styles.card}>
          <View style={styles.greetingContainer}>
            <MaterialIcons name="waving-hand" size={24} color="#4CAF50" />
            <Text style={styles.greetingText}>你好，感謝你下載此 APP</Text>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionTitleContainer}>
              <MaterialIcons name="track-changes" size={20} color="#2E7D32" />
              <Text style={styles.sectionTitle}>我們的理念</Text>
            </View>
            <Text style={styles.bodyText}>
              此 APP
              主要理念是為了在萬物皆漲的時代，讓你可以更精打細算而誕生的工具。
            </Text>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionTitleContainer}>
              <MaterialIcons name="build" size={20} color="#2E7D32" />
              <Text style={styles.sectionTitle}>目前功能</Text>
            </View>
            <View style={styles.featureList}>
              <View style={styles.featureItem}>
                <MaterialIcons name="analytics" size={18} color="#4CAF50" />
                <Text style={styles.featureText}>月票計算機</Text>
              </View>
              <View style={styles.featureItem}>
                <MaterialIcons name="compare" size={18} color="#4CAF50" />
                <Text style={styles.featureText}>A/B CP Battle</Text>
              </View>
            </View>
            <Text style={styles.bodyText}>
              雖然都是透過計算機就可以做到的事情，但有個工具可視化不是更棒嗎？
            </Text>
          </View>

          <View>
            <View style={styles.sectionTitleContainer}>
              <MaterialIcons name="lightbulb" size={20} color="#2E7D32" />
              <Text style={styles.sectionTitle}>開發動機</Text>
            </View>
            <Text style={styles.bodyText}>
              此工具也是在解決我自己日常需要的問題。
            </Text>
          </View>
        </View>

        {/* 未來規劃 */}
        <View style={styles.card}>
          <View style={styles.sectionTitleContainer}>
            <MaterialIcons name="rocket-launch" size={20} color="#2E7D32" />
            <Text style={styles.sectionTitle}>未來規劃</Text>
          </View>
          <Text style={styles.bodyText}>
            後續也會持續新增功能與優化體驗，讓這個工具變得更加實用！
          </Text>
        </View>

        {/* 聯絡資訊 */}
        <View style={styles.contactCard}>
          <View style={styles.contactTitleContainer}>
            <MaterialIcons name="feedback" size={20} color="#2E7D32" />
            <Text style={styles.contactTitle}>意見回饋</Text>
          </View>
          <Text style={styles.contactText}>有任何建議或發現 bug</Text>
          <Text style={styles.contactText}>歡迎來信告訴我們</Text>
          <TouchableOpacity
            style={styles.emailButton}
            onPress={handleEmailPress}
          >
            <MaterialIcons
              name="email"
              size={16}
              color="#FFFFFF"
              style={styles.emailIcon}
            />
            <Text style={styles.emailText}>Allen lun</Text>
          </TouchableOpacity>
        </View>

        {/* 底部感謝 */}
        <View style={styles.footer}>
          <MaterialIcons name="favorite" size={18} color="#FF6B6B" />
          <Text style={styles.footerText}>感謝您的使用與支持</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  container: {
    padding: 20,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2E7D32",
    marginLeft: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    fontStyle: "italic",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  greetingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  greetingText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginLeft: 8,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2E7D32",
    marginLeft: 8,
  },
  bodyText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#555",
    textAlign: "justify",
  },
  featureList: {
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  featureBullet: {
    fontSize: 16,
    marginRight: 12,
  },
  featureText: {
    fontSize: 16,
    color: "#555",
    fontWeight: "500",
    marginLeft: 8,
  },
  contactCard: {
    backgroundColor: "#E8F5E8",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#4CAF50",
  },
  contactTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2E7D32",
    marginLeft: 8,
  },
  contactText: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 16,
  },
  emailButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  emailIcon: {
    marginRight: 8,
  },
  emailText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  footerText: {
    fontSize: 16,
    color: "#888",
    fontStyle: "italic",
    marginLeft: 8,
  },
});
