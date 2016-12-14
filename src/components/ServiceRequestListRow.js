import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  LayoutAnimation,
  Dimensions,
} from 'react-native';

import Global       from '../util/globals';
import Util         from '../util/util';
import chevronIcon  from '../img/chevron_right.png';
import transList    from '../translations/list';

class ServiceRequestListRow extends Component {

  constructor(props, context) {
    super(props, context);

    transList.setLanguage('fi');
  }

  render() {
    // If there are no status notes display the latest state of the service request
    var responseText = this.props.statusNotes ?
      <Text style={styles.statusText}>
        {transList.responseText}, {this.props.agency}
      </Text> :
      <Text style={styles.noStatusText}>
        {this.props.extendedData[this.props.extendedData.length-1].state}, {this.props.agency}
      </Text>;
    var day = Util.getDate(this.props.date);

    // Add a month label to seperate days. Month labels only appear once
    var monthText = null;
    if (Global.listItemMonth === null || Util.getMonth(this.props.date) !== Global.listItemMonth ) {
      Global.listItemMonth = Util.getMonth(this.props.date);
      var month = Util.getLocalizedMonthName(Util.getMonth(this.props.date)).toUpperCase();
      monthText = <Text style={styles.monthText}>{month}</Text>;
    }

    return (
      <TouchableWithoutFeedback onPress={this.props.onItemClick}>
        <View>
        {monthText}
          <View style={styles.container}>
              <View style={styles.dateView}>
                <Text style={styles.dateText}>{day}</Text>
              </View>
              <View style={styles.contentContainer}>
                <Text style={styles.titleText}>{this.props.title}</Text>
                <Text style={styles.descriptionText} numberOfLines={3}>{this.props.description}</Text>
                <Text >{responseText}</Text>
              </View>
              <View style={styles.chevronView}>
                <Image source={chevronIcon} style={styles.chevronImage} />
              </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  monthText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Global.COLOR.BLACK,
    marginBottom: 16
  },
  dateView: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginTop: 4,
    backgroundColor: Global.COLOR.BLUE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateText: {
    color: Global.COLOR.WHITE,
    fontSize: 16
  },
  contentContainer: {
    flex: 1,
    marginLeft: 16,
    marginRight: 16,
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Global.COLOR.BLACK
  },
  descriptionText: {
    fontSize: 14,
    color: Global.COLOR.WARM_GREY
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Global.COLOR.BLACK
  },
  noStatusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Global.COLOR.WARM_GREY
  },
  chevronView: {
    marginTop: 8,
  },
  chevronImage: {
    height: 12,
    width: 12,
  }
});

module.exports = ServiceRequestListRow
